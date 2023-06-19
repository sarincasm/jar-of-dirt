import 'package:flutter/material.dart';

class Splash extends StatelessWidget {
  const Splash({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/splash.jpeg'),
            fit: BoxFit.cover,
          ),
        ),
        width: double.infinity,
        child: SizedBox(
          height: double.infinity,
          child: Align(
            alignment: const Alignment(0.0, -0.4),
            child: Text(
              'Lets Flutter Some Feathers'.toUpperCase(),
              style: TextStyle(
                fontSize: 21,
                fontWeight: FontWeight.bold,
                color:
                    (const HSLColor.fromAHSL(1.0, 15.9, .983, .533)).toColor(),
              ),
            ),
          ),
        ));
  }
}
