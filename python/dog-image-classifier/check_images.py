from os import listdir, path
from time import time
import argparse

from pretrained.classifier import classifier


def main():
    start_time = time()
    input_args = get_input_args()
    true_labels = get_pet_labels(input_args.image_dir)
    result = classify_images(input_args.image_dir,
                             true_labels, input_args.arch)
    print(result)
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
    return parser.parse_args()


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


if __name__ == "__main__":
    main()
