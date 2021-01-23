from os import listdir, path
from time import time
import argparse

from pretrained.classifier import classifier


def main():
    start_time = time()
    image_dir, arch, dogfile = get_input_args()
    true_labels = get_pet_labels(image_dir)
    result = classify_images(image_dir,
                             true_labels, arch)
    extend_result_is_dog(result, dogfile)
    stats = calculate_stats(result)
    print_result(result, stats, arch, True)
    end_time = time()

    print('\n')
    print('Running Time: ', get_formatted_running_time(start_time, end_time))


def get_formatted_running_time(start_time, end_time):
    running_time_seconds = end_time - start_time
    running_time_hh = str(int(running_time_seconds/3600))
    running_time_mm = str(int((running_time_seconds % 3600)/60))
    running_time_ss = str(round((running_time_seconds % 3600) % 60, 2))
    return running_time_hh + ':' + running_time_mm + ':' + running_time_ss


def get_input_args():
    """
    Parse command line arguments.
    Parameters:
        None
    Returns:
        parse_args()
    """
    parser = argparse.ArgumentParser(description='add description here')
    parser.add_argument('--image-dir', type=str,
                        help='path to images folder', default='pet_images')
    parser.add_argument('--arch', type=str, default='vgg',
                        choices=['vgg', 'resnet', 'alexnet'], help='CNN model architecture to use')
    parser.add_argument('--dogfile', type=str,
                        default='dognames.txt', help='dognames text file')
    return vars(parser.parse_args()).values()


def get_pet_labels(image_dir):
    """
    This is used to check accuracy of the classifier.
    Read pet filenames & extract label from filename.
    Return it as a dict.
    Parameters:
        image_dir
    Returns:
        true_labels
    """
    filenames_list = listdir(image_dir)
    true_labels = dict()
    for filename in filenames_list:
        fname_lower = filename.lower()
        components = fname_lower.split('_')
        pet_label = ''
        for word in components:
            if word.isalpha():
                pet_label += word + ' '
        pet_label = pet_label.strip()
        if filename not in true_labels:
            true_labels[filename] = pet_label

    return true_labels


def classify_images(image_dir, true_labels, model):
    """
    Parameters:
        image_dir
        true_labels
        model
    Returns:
        result - dict {filename: list}
            list in this form:
            [
                true_label,
                classifier_label,
                1/0 - match b/w true & classifier labels
            ]
    """
    result = dict()
    for filename in true_labels:
        classifier_label = classifier(path.join(image_dir, filename), model)
        classifier_label = classifier_label.lower()
        classifier_label = classifier_label.strip()

        true_label = true_labels[filename]

        # classifier_label is sometimes a value like "a, b, c"
        # where true_label might be "a" or "b" or "c"
        # therefore we search if it actually matches
        found = classifier_label.find(true_label)
        if found >= 0:
            if ((found == 0 and len(true_label) == len(classifier_label)) or
                    (((found == 0) or (classifier_label[found - 1] == " ")) and
                     ((found + len(true_label) == len(classifier_label)) or
                              (classifier_label[found + len(true_label): found+len(true_label)+1] in
                               (",", " "))
                              )
                     )
                    ):
                if filename not in result:
                    result[filename] = [true_label, classifier_label, 1]
            else:
                if filename not in result:
                    result[filename] = [true_label, classifier_label, 0]

        else:
            if filename not in result:
                result[filename] = [true_label, classifier_label, 0]

    return result


def extend_result_is_dog(result, dogfile):
    """
    Parameters:
        result
        dogfile
    Returns:
        None - mutates each entry in result
        each item now looks like this
            [
                true_label,
                classifier_label,
                1/0 - match b/w true & classifier labels,
                1/0 - true_label indicates dog,
                1/0 - classifier_label indicates dog
            ]
    """
    dognames = dict()

    with open(dogfile, 'r') as dogfile_data:
        dogname = dogfile_data.readline()
        while dogname != '':
            dogname = dogname.rstrip()
            if dogname not in dognames:
                dognames[dogname] = 1

            dogname = dogfile_data.readline()

    for key in result:
        if result[key][0] in dognames:
            if result[key][1] in dognames:
                result[key].extend((1, 1))
            else:
                result[key].extend((1, 0))
        else:
            if result[key][1] in dognames:
                result[key].extend((0, 1))
            else:
                result[key].extend((0, 0))


def calculate_stats(result):
    """
    Parameters:
        result
    Returns:
        stats
    """
    stats = dict()

    stats['n_dogs_images'] = 0
    stats['n_matches'] = 0
    stats['n_correct_dogs'] = 0
    stats['n_correct_notdogs'] = 0
    stats['n_correct_breed'] = 0

    stats['n_images'] = len(result)

    for key in result:
        if result[key][2] == 1:
            stats['n_matches'] += 1
        if sum(result[key][2:]) == 3:
            stats['n_correct_breed'] += 1
        if result[key][3] == 1:
            stats['n_dogs_images'] += 1
            if result[key][4] == 1:
                stats['n_correct_dogs'] += 1
        else:
            if result[key][4] == 0:
                stats['n_correct_notdogs'] += 1

    stats['n_notdogs_images'] = stats['n_images'] - stats['n_dogs_images']

    stats['pct_matches'] = 100*stats['n_matches']/stats['n_images']
    stats['pct_correct_dogs'] = 100 * \
        stats['n_correct_dogs']/stats['n_dogs_images']
    stats['pct_correct_breed'] = 100 * \
        stats['n_correct_breed']/stats['n_dogs_images']

    if stats['n_notdogs_images'] > 0:
        stats['pct_correct_notdogs'] = 100 * \
            stats['n_correct_notdogs'] / stats['n_notdogs_images']

    return stats


def print_result(result, stats, model, print_incorrect=False):
    print('\n\n*** Summary for Model ', model.upper(), '***')
    print('%20s: %3d' % ('N Images', stats['n_images']))
    print('%20s: %3d' % ('N Dog Images', stats['n_dogs_images']))
    print('%20s: %3d' % ('N Not-Dog Images', stats['n_notdogs_images']))

    for key in stats:
        if key[0] == 'p':
            print('%20s: %5.1f' % (key, stats[key]))

    if print_incorrect:
        if (stats['n_correct_dogs'] + stats['n_correct_notdogs']) != stats['n_images']:
            print('\nIncorrect Dog/NOT Dog:')

            for key in result:
                if sum(result[key][3:]) == 1:
                    print('True: %-26s   Classifier: %-30s' %
                          (result[key][0], result[key][1]))

        if stats['n_correct_dogs'] != stats['n_correct_breed']:
            print('\nIncorrect Dog Breed:')

            for key in result:
                if sum(result[key][3:]) == 2 and result[key][2] == 0:
                    print('True: %-26s   Classifier: %-30s' %
                          (result[key][0], result[key][1]))


if __name__ == '__main__':
    main()
