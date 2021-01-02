from time import time, sleep
import argparse


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
    parser.add_argument('--image-dir', type=str, help='path to images folder')
    parser.add_argument('--arch', type=str, default='vgg',
                        choices=['vgg', 'resnet', 'alexnet'], help='CNN model architecture to use')
    parser.add_argument('--dogfile', type=str,
                        default='dognames.txt', help='dognames text file')
    return parser.parse_args()


def main():
    start_time = time()
    input_args = get_input_args()
    print(input_args)
    sleep(1.6)
    end_time = time()

    print('Running Time: ', get_formatted_running_time(start_time, end_time))


if __name__ == "__main__":
    main()
