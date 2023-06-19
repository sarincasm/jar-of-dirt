void main() {
  void explicitVoidReturnType() {
    print("I'm also a function");
  }

  // positioned and named args
  int sum(int a, {required int b}) {
    return a + b;
  }

  // lambda
  Function myArrow = (int a, int b) => a + b;

  explicitVoidReturnType();
  print(sum(1, b: 2));
  print(myArrow(1, 2));
}
