class P {
  int id = 0;
  show() {
    print("Person id: ${this.id}");
  }
}

class Request {
  int id = 0;
  String url = "";

  Request(int id, String url) {
    this.id = id;
    this.url = url;
  }

  // named constructor (using shorthand)
  Request.fromData(this.id, this.url);
}

class HttpRequest extends Request {
  HttpRequest(int id, String url) : super(id, url);
}

class Car {
  int id;
  String name;

  // constructor with named parameters
  Car({required this.id, required this.name});
}

void main() {
  // new keyword is optional
  final p = P();
  final q = new P();
  p.show();
  q.show();
}
