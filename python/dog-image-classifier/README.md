<!-- @format -->

# Classifying Images

Using Python to classify images of dogs & their breeds.

Code based on [this lab](https://github.com/udacity/AIPND/tree/master/intropylab-classifying-images).

# Setup

-  Create env & install packages

```
conda env create -f environment.yaml
conda activate pdoimcl
```

-  Download image data from [here](https://go.g6g.me/pdoimclpi)

# Run

```
python check_images.py
```

Run with --help to see what arguments can be passed.

Batch file to run the classifier for all CNN architectures. This will write results to the `results` directory.

```
run_all_models.bat
```

# Useful Links

-  https://github.com/udacity/AIPND/tree/master/intropylab-classifying-images
-  [Argparse Tutorial](https://docs.python.org/3/howto/argparse.html)
-  [String Formatting](https://docs.python.org/3/library/string.html#format-string-syntax)
-  https://github.com/udacity/AIPND-revision
