import 'package:flutter/material.dart';

class ContentCard extends StatelessWidget {
  const ContentCard({super.key});

  @override
  Widget build(BuildContext context) {
    const description =
        'An amazing description of the content that is being displayed.';
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Container(
        height: 400,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          image: DecorationImage(
              image: const AssetImage('assets/splash.jpeg'),
              fit: BoxFit.cover,
              colorFilter: ColorFilter.mode(
                Colors.black.withOpacity(0.3),
                BlendMode.darken,
              )),
        ),
        child: const Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Text(description),
          ],
        ),
      ),
    );
  }
}

class WideContentCard extends StatelessWidget {
  const WideContentCard({super.key});

  @override
  Widget build(BuildContext context) {
    const description =
        'An amazing description of the content that is being displayed.';
    return Container(
      height: 160,
      width: 320,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        image: DecorationImage(
            image: const AssetImage('assets/splash.jpeg'),
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(
              Colors.black.withOpacity(0.3),
              BlendMode.darken,
            )),
      ),
      child: const Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Text(description),
        ],
      ),
    );
  }
}
