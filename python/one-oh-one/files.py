def basic_read():
  f = open('data/simple.txt')
  data = f.read()
  print(data)
  print(type(data))
  f.close()

def basic_write():
  f = open('data/write.txt', 'w')
  f.write('Everything I know, I know because of love.')
  f.close()

def auto_close():
  with open('data/simple.txt', 'r') as f:
    data = f.read()
    print(data)

def read_cursor():
  with open('data/simple.txt', 'r') as f:
    print(f.read(10))
    print(f.read(8))
    print(f.read(15))

def read_line():
  with open('data/simple.txt', 'r') as f:
    for line in f:
      print(line.strip())

if __name__ == "__main__":
  read_line()
