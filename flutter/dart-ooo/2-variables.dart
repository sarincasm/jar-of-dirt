/**
 * statically typed language,
 * also flexible and supports type inference
 * with `var`, `const` and the `dynamic type`
 * On web, types may not be 100% enforced at runtime.
 */

// Mutable Variables
int data = 3;
var otherData = 5;

// Immutable Variables with `final`
// We can set final variables' content at runtime
final notMutableObject = "final string";
final int otherImmutable = 5;

// We must set const content at compile time
const pi = 3.14;

playingWithTypes() {
  // Core Data Types
  String stringValue;
  int integerValue;
  double doubleValue;
  bool booleanValue;
  dynamic anything;
  num aNumber;

  // String Literals, double quotes or single quotes
  print("Hello World");
  // Multi-line literal strings
  var multiline = """
      sdfsdf
  """;
  print(multiline);

  var price = 3;
  var otherPrice = 5.2;

  // Every string can have template expressions using $ or ${}
  // expression result will be converted to string
  var message = "The $price price is ${otherPrice * 1.1}";
  print(message);
}

void main() {
  playingWithTypes();
}
