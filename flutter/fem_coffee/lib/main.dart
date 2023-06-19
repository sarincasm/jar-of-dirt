import 'package:fem_coffee/offers_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const CoffeeMasters());
}

class CoffeeMasters extends StatelessWidget {
  const CoffeeMasters({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Coffee Masters',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        useMaterial3: true,
      ),
      home: const CoffeeHomePage(title: 'Coffee Masters'),
    );
  }
}

class CoffeeHomePage extends StatefulWidget {
  const CoffeeHomePage({super.key, required this.title});

  final String title;

  @override
  State<CoffeeHomePage> createState() => _CoffeeHomePageState();
}

class _CoffeeHomePageState extends State<CoffeeHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: const OffersPage(),
    );
  }
}
