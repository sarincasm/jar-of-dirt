import 'dart:ui';
import 'package:intl/intl.dart';
import 'package:feathers/content.dart';
import 'package:flutter/material.dart';

import 'data.dart';

const actionRowColor = Colors.white;
const actionRowColorInverted = Colors.black87;

class CreatorProfile extends StatelessWidget {
  final Creator creator;
  final bool isFollowing;
  final bool isGettingNotified;
  final Function onClickFollowButton;
  final Function onClickNotificationButton;

  const CreatorProfile({
    super.key,
    required this.creator,
    required this.isFollowing,
    required this.isGettingNotified,
    required this.onClickFollowButton,
    required this.onClickNotificationButton,
  });

  @override
  Widget build(BuildContext context) {
    final creatorName = creator.creatorName;
    // var backgroundColor =
    //     (const HSLColor.fromAHSL(1.0, 61.1, .948, .547)).toColor();
    // var backgroundColor =
    //     (const HSLColor.fromAHSL(1.0, 334.9, .579, .814)).toColor();
    // var backgroundColor =
    //     (const HSLColor.fromAHSL(1.0, 177.5, .973, .293)).toColor();
    var backgroundColor =
        (const HSLColor.fromAHSL(1.0, 206.5, .607, .89)).toColor();
    return Container(
        color: backgroundColor,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            Container(
              height: 550,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: Image.network(creator.creatorImageUrl).image,
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(
                    Colors.black.withOpacity(0.5),
                    BlendMode.darken,
                  ),
                ),
              ),
              width: double.infinity,
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 70, sigmaY: 60),
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding: const EdgeInsets.all(65.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        CircleAvatar(
                          radius: 75,
                          backgroundImage:
                              Image.network(creator.creatorImageUrl).image,
                        ),
                        const SizedBox(
                          height: 30,
                        ),
                        Text(
                          creatorName,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Text(
                          '${NumberFormat.compact().format(creator.followerCount)} Followers',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(
                          height: 30,
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 15, right: 15),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              FollowButton(
                                onPressed: onClickFollowButton,
                                isActive: isFollowing,
                              ),
                              GetNotifiedButton(
                                onPressed: onClickNotificationButton,
                                isVisible: isFollowing,
                                isActive: isGettingNotified,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 5,
            ),
            Text(
              textAlign: TextAlign.center,
              'Latest From ${creator.creatorName}',
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            for (var contentSummary in creator.contentSummaries)
              ContentCard(
                contentSummary: contentSummary,
              ),
            const SizedBox(
              height: 30,
            ),
          ],
        ));
  }
}

class GetNotifiedButton extends StatelessWidget {
  const GetNotifiedButton({
    super.key,
    required this.isVisible,
    required this.isActive,
    required this.onPressed,
  });

  final bool isVisible;
  final bool isActive;
  final Function onPressed;

  @override
  Widget build(BuildContext context) {
    final icon =
        isActive ? Icons.notifications_active : Icons.notification_add_outlined;
    final backgroundColor = isActive ? actionRowColor : Colors.transparent;
    final textColor = isActive ? actionRowColorInverted : actionRowColor;

    if (!isVisible) {
      return Container();
    }

    return OutlinedButton(
      onPressed: () {
        onPressed();
      },
      style: OutlinedButton.styleFrom(
        backgroundColor: backgroundColor,
        shape: const CircleBorder(),
        side: const BorderSide(
          color: actionRowColor,
          width: 0.5,
          style: BorderStyle.solid,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Icon(
          icon,
          color: textColor,
          size: 30,
        ),
      ),
    );
  }
}

class FollowButton extends StatelessWidget {
  const FollowButton({
    super.key,
    required this.onPressed,
    required this.isActive,
  });

  final Function onPressed;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    final text = isActive ? 'Following' : 'Follow';
    final backgroundColor = isActive ? actionRowColor : Colors.transparent;
    final textColor = isActive ? actionRowColorInverted : actionRowColor;

    return OutlinedButton(
      onPressed: () {
        onPressed();
      },
      style: OutlinedButton.styleFrom(
        backgroundColor: backgroundColor,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topRight: Radius.circular(45),
            bottomRight: Radius.circular(15),
            topLeft: Radius.circular(15),
            bottomLeft: Radius.circular(45),
          ),
        ),
        side: const BorderSide(
          color: actionRowColor,
          width: 0.5,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(
          text.toUpperCase(),
          style: TextStyle(
            color: textColor,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
