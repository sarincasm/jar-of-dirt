import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'package:feathers/creator.dart';
import 'package:feathers/data.dart';

enum Variant { following, discover, imagine }

class Discover extends StatefulWidget {
  final CreatorsList creatorsList;
  final Function onClickCreator;
  final User user;
  final Function onClickFollowButton;
  final Variant? variant;

  const Discover({
    super.key,
    required this.creatorsList,
    required this.onClickCreator,
    required this.user,
    required this.onClickFollowButton,
    this.variant = Variant.discover,
  });

  @override
  State<Discover> createState() => _DiscoverState();
}

class _DiscoverState extends State<Discover> {
  late final List<Creator> creatorsNotFollowing;

  @override
  void initState() {
    super.initState();
    creatorsNotFollowing = widget.creatorsList.creators
        .where((creator) => !creator.isFollowing(widget.user))
        .toList();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var title = 'Discover';
    var promptText = '';

    if (widget.variant == Variant.following) {
      title = 'Following';
      promptText =
          'You are not following anyone yet. Discover something new today.';
    } else if (widget.variant == Variant.imagine) {
      title = 'Imagine';
      promptText =
          'These creators are not part of the OneFootball platform - yet. Imagine if they were.';
    }

    var backgroundColor =
        (const HSLColor.fromAHSL(1.0, 206.5, .607, .89)).toColor();
    return Container(
        color: backgroundColor,
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 60,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            if (widget.variant != Variant.discover)
              Prompt(
                promptText: promptText,
              ),
            for (var creator in creatorsNotFollowing)
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: CreatorSummaryCard(
                  creator: creator,
                  isFollowing: creator.isFollowing(widget.user),
                  onTap: widget.onClickCreator,
                  onClickFollowButton: widget.onClickFollowButton,
                ),
              ),
          ],
        ));
  }
}

class Prompt extends StatelessWidget {
  final String promptText;

  const Prompt({
    super.key,
    required this.promptText,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Text(
        promptText,
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}

class CreatorSummaryCard extends StatelessWidget {
  final Creator creator;
  final Function onTap;
  final bool isFollowing;
  final Function onClickFollowButton;

  const CreatorSummaryCard({
    super.key,
    required this.creator,
    required this.onTap,
    required this.isFollowing,
    required this.onClickFollowButton,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        onTap(creator.creatorId);
      },
      child: Row(
        children: [
          Expanded(
            child: CircleAvatar(
              radius: 75,
              backgroundImage: Image.network(creator.creatorImageUrl).image,
            ),
          ),
          const SizedBox(
            width: 15,
          ),
          Expanded(
            child: Column(
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
                FollowButton(
                  onPressed: () {
                    onClickFollowButton(creator.creatorId);
                  },
                  isActive: isFollowing,
                  color: Colors.black,
                  invertedColor: Colors.white,
                  size: FollowButtonSize.small,
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
