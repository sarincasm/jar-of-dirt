import 'package:flutter/material.dart';

import 'package:feathers/content.dart';
import 'package:feathers/data.dart';

class Following extends StatelessWidget {
  final List<ContentSummary> contentSummaries;
  const Following({
    super.key,
    required this.contentSummaries,
  });

  static const following = ['hi'];

  @override
  Widget build(BuildContext context) {
    var backgroundColor =
        (const HSLColor.fromAHSL(1.0, 206.5, .607, .89)).toColor();

    return Container(
      color: backgroundColor,
      child: ListView(
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Following',
              style: TextStyle(
                fontSize: 60,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          for (var contentSummary in contentSummaries)
            ContentCard(
              contentSummary: contentSummary,
            ),
        ],
      ),
    );
  }
}

class FollowingContent extends StatelessWidget {
  final List following;
  const FollowingContent({
    super.key,
    required this.following,
  });

  @override
  Widget build(BuildContext context) {
    if (following.isNotEmpty) {
      return const Column(
        children: [
          ContentCard(),
          ContentCard(),
          ContentCard(),
          ContentCard(),
          ContentCard(),
        ],
      );
    } else {
      return const Padding(
        padding: EdgeInsets.all(16.0),
        child: Text(
          'You are not following anyone yet.',
          style: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.bold,
          ),
        ),
      );
    }
  }
}
