import 'package:flutter/material.dart';

import 'package:feathers/data.dart';

class ContentCard extends StatelessWidget {
  final ContentSummary? contentSummary;
  final bool showCreator;
  final Function onClickCreator;

  static void _doNothing() {}

  const ContentCard({
    super.key,
    this.contentSummary,
    this.showCreator = false,
    this.onClickCreator = _doNothing,
  });

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
              child: Row(
                children: [
                  if (showCreator)
                    GestureDetector(
                      onTap: () {
                        onClickCreator(contentSummary?.creatorId);
                      },
                      child: Expanded(
                        flex: 0,
                        child: CircleAvatar(
                          radius: 20,
                          backgroundImage: NetworkImage(
                            contentSummary?.creatorImageUrl ?? '',
                          ),
                        ),
                      ),
                    ),
                  if (showCreator) const SizedBox(width: 15),
                  Expanded(
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
          ],
        ),
      ),
    );
  }
}

class WideContentCard extends StatelessWidget {
  final ContentSummary contentSummary;
  final Function onClickCreator;

  const WideContentCard({
    super.key,
    required this.contentSummary,
    required this.onClickCreator,
  });

  @override
  Widget build(BuildContext context) {
    var title = contentSummary.title;
    var imageUrl = contentSummary.imageUrl;
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
            child: Row(
              children: [
                Expanded(
                  flex: 0,
                  child: GestureDetector(
                    onTap: () {
                      onClickCreator(contentSummary.creatorId);
                    },
                    child: CircleAvatar(
                      radius: 20,
                      backgroundImage: NetworkImage(
                        contentSummary.creatorImageUrl,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  flex: 1,
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
          ),
        ],
      ),
    );
  }
}
