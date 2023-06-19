void main() {
  late String myName;
  // error
  // print(myName);
  myName = "Eels";
  print(myName);
  String? myLastname;
  print(myLastname);

  // error
  // print(myLastname!.length);

  print(myLastname?.length);
}
