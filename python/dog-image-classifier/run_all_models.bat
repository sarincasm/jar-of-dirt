python check_images.py --image-dir pet_images/ --arch resnet  --dogfile dognames.txt > results/resnet.txt
python check_images.py --image-dir pet_images/ --arch alexnet  --dogfile dognames.txt > results/alexnet.txt
python check_images.py --image-dir pet_images/ --arch vgg  --dogfile dognames.txt > results/vgg.txt