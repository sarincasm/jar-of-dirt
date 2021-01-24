<!-- @format -->

# [Anaconda](https://www.anaconda.com/products/individual)

## Cheat Sheet

```
conda create -n dirty_env python=3.8
conda activate dirty_env
conda install numpy pandas

conda create -n dirty_env list of packages

conda env list

conda env export > environment.yaml
conda env create -f environment.yaml
conda env update --file environment.yml

conda env remove -n old_dirty
```

```
conda upgrade conda
conda upgrade --all

conda list
conda remove numpy
conda update pandas
conda update --all

conda search '*beautifulsoup*'
```

## Useful Links

-  [Change directory when activating an environment](https://stackoverflow.com/questions/52694732/how-to-change-directory-when-activating-conda-environment-in-windows)
