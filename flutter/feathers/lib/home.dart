import 'package:flutter/material.dart';

import 'package:feathers/content.dart';

import 'schema.dart';

class Home extends StatelessWidget {
  final List<HomeSection> homeSections;
  final Function onClickCreator;

  const Home({
    super.key,
    required this.homeSections,
    required this.onClickCreator,
  });

  @override
  Widget build(BuildContext context) {
    var backgroundColor =
        (const HSLColor.fromAHSL(1.0, 206.5, .607, .89)).toColor();

    return Container(
        color: backgroundColor,
        child: ListView.builder(
          itemCount: homeSections.length + 1,
          itemBuilder: (context, index) {
            if (index == 0) {
              return const Padding(
                padding: EdgeInsets.all(16.0),
                child: Text(
                  'Home',
                  style: TextStyle(
                    fontSize: 60,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              );
            }

            var section = homeSections[index - 1];
            return Padding(
              padding: const EdgeInsets.only(top: 16.0, bottom: 16.0),
              child: ContentSection(
                sectionName: section.title,
                sectionSubTitle: section.subtitle,
                contentSummaries: section.contentSummaries,
                onClickCreator: onClickCreator,
              ),
            );
          },
        ));
  }
}

class ContentSection extends StatelessWidget {
  final String sectionName;
  final String sectionSubTitle;
  final List<ContentSummary> contentSummaries;
  final Function onClickCreator;

  const ContentSection({
    super.key,
    required this.sectionName,
    required this.sectionSubTitle,
    required this.contentSummaries,
    required this.onClickCreator,
  });

  @override
  Widget build(BuildContext context) {
    var itemCount = contentSummaries.length;
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                sectionName,
                style: const TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 2.0),
                child: Text(
                  sectionSubTitle,
                  style: const TextStyle(
                    fontSize: 14,
                  ),
                ),
              ),
            ],
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
                    contentSummary: contentSummaries[index],
                    onClickCreator: onClickCreator,
                  ),
                );
              },
            ),
          ),
        ),
      ],
    );
  }
}
