import 'package:feathers/data.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Discover extends StatelessWidget {
  final CreatorsList creatorsList;
  final Function onClickCreator;

  const Discover({
    super.key,
    required this.creatorsList,
    required this.onClickCreator,
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
                'Discover',
                style: TextStyle(
                  fontSize: 60,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            for (var creator in creatorsList.creators)
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: CreatorSummaryCard(
                  creator: creator,
                  onTap: onClickCreator,
                ),
              ),
          ],
        ));
  }
}

class CreatorSummaryCard extends StatelessWidget {
  final Creator creator;
  final Function onTap;

  const CreatorSummaryCard({
    super.key,
    required this.creator,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        onTap(creator.creatorId);
      },
      child: Row(
        children: [
          CircleAvatar(
            radius: 75,
            backgroundImage: Image.network(creator.creatorImageUrl).image,
          ),
          const SizedBox(
            width: 15,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                creator.creatorName,
                style: const TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                '${NumberFormat.compact().format(creator.followerCount)} Followers',
                style: const TextStyle(
                  fontSize: 16,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
