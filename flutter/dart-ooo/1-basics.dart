/**
 * global expressions without the need of a function or class.
 * if you are targeting Android, you will always need a class
 * (Java VM requirement).
 */

var x = 2;

// Everything is public in the package, unless it's prefixed with _
class X {
  String publicProperty = "";
  String _privateProperty = "";
}

void main() {
  var y = 1;

  playingWithDart() {
    if ((x > 1) && (y < 2)) {
      print('x is greater than 1 and y is less than 2');
    }
    while (x < 10) {
      x++;
    }
    print(x);

    for (var i in [1, 2, 3]) {
      print(i);
    }
  }

  playingWithDart();
}
