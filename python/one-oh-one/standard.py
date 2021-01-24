# https://docs.python.org/3/library/

# commonly used - csv, collections, string, re, os, os.path
# sys, json, math, random

import math as mt
from random import choices

def generate_random():
  words_list = []
  with open('data/simple.txt', 'r') as f:
    for line in f:
      words = line.strip().split(' ')
      words_list += words
  random_words = choices(words_list, k=3)
  return ''.join(random_words)

def main():
  print(mt.exp(3))
  print(generate_random())

if __name__ == "__main__":
  main()