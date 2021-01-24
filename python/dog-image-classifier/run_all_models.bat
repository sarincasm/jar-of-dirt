python check_images.py --image-dir data/pet_images/ --arch resnet  --dogfile data/dognames.txt > results/resnet.txt
python check_images.py --image-dir data/pet_images/ --arch alexnet  --dogfile data/dognames.txt > results/alexnet.txt
python check_images.py --image-dir data/pet_images/ --arch vgg  --dogfile data/dognames.txt > results/vgg.txt