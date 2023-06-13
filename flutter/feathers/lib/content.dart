import 'package:flutter/material.dart';

import 'package:feathers/data.dart';

class ContentCard extends StatelessWidget {
  final ContentSummary? contentSummary;
  const ContentCard({super.key, this.contentSummary});

  @override
  Widget build(BuildContext context) {
    var title = contentSummary?.title ??
        'An amazing description of the content that is being displayed.';
    var imageUrl = contentSummary?.imageUrl ?? '';
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Container(
        height: 400,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          image: DecorationImage(
              image: FadeInImage.assetNetwork(
                fadeInDuration: const Duration(milliseconds: 500),
                image: imageUrl,
                placeholder: 'assets/splash.jpeg',
              ).image,
              fit: BoxFit.cover,
              colorFilter: ColorFilter.mode(
                Colors.black.withOpacity(0.3),
                BlendMode.darken,
              )),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Padding(
              padding: const EdgeInsets.all(18.0),
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class WideContentCard extends StatelessWidget {
  final ContentSummary? contentSummary;
  const WideContentCard({
    super.key,
    this.contentSummary,
  });

  @override
  Widget build(BuildContext context) {
    var title = contentSummary?.title ??
        'An amazing description of the content that is being displayed.';
    var imageUrl = contentSummary?.imageUrl ?? '';
    return Container(
      height: 160,
      width: 320,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        image: DecorationImage(
            image: FadeInImage.assetNetwork(
              fadeInDuration: const Duration(milliseconds: 500),
              image: imageUrl,
              placeholder: 'assets/splash.jpeg',
            ).image,
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(
              Colors.black.withOpacity(0.5),
              BlendMode.darken,
            )),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Padding(
            padding: const EdgeInsets.all(18.0),
            child: Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
