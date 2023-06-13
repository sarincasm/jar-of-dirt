import 'package:flutter/material.dart';

import 'package:feathers/content.dart';

import 'data.dart';

class Home extends StatelessWidget {
  final ContentList featuredList;
  final ContentList favoriteTeam1List;
  final ContentList favoriteTeam2List;
  final ContentList favoritePlayer1List;

  const Home({
    super.key,
    required this.featuredList,
    required this.favoriteTeam1List,
    required this.favoriteTeam2List,
    required this.favoritePlayer1List,
  });

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
              'Home',
              style: TextStyle(
                fontSize: 60,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
            child: ContentSection(
              sectionName: 'Featured',
              contentList: featuredList,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
            child: ContentSection(
              sectionName: 'Favorite Team 1',
              contentList: favoriteTeam1List,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
            child: ContentSection(
              sectionName: 'Favorite Team 2',
              contentList: favoriteTeam2List,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
            child: ContentSection(
              sectionName: 'Favorite Player 1',
              contentList: favoritePlayer1List,
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 16.0, bottom: 16.0),
            child: ContentSection(sectionName: 'Following'),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 16.0, bottom: 16.0),
            child: ContentSection(sectionName: 'Following 1'),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 16.0, bottom: 16.0),
            child: ContentSection(sectionName: 'Following 2'),
          ),
        ],
      ),
    );
  }
}

class ContentSection extends StatelessWidget {
  final String sectionName;
  final ContentList? contentList;

  const ContentSection({
    super.key,
    required this.sectionName,
    this.contentList,
  });

  @override
  Widget build(BuildContext context) {
    var itemCount = contentList?.contentSummaries.length ?? 4;
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16.0),
          child: Text(
            sectionName,
            style: const TextStyle(
              fontSize: 30,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 16.0),
          child: SizedBox(
            height: 160,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: itemCount,
              itemBuilder: (context, index) {
                var rightPadding = 0.0;
                if (index == itemCount - 1) {
                  rightPadding = 16.0;
                }
                return Padding(
                  padding: EdgeInsets.only(left: 16.0, right: rightPadding),
                  child: WideContentCard(
                      contentSummary: contentList?.contentSummaries[index]),
                );
              },
            ),
          ),
        ),
      ],
    );
  }
}
