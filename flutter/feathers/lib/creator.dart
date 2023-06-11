import 'dart:ui';
import 'package:intl/intl.dart';
import 'package:feathers/content.dart';
import 'package:flutter/material.dart';

import 'data.dart';

class CreatorProfile extends StatelessWidget {
  final Creator creator;

  const CreatorProfile({super.key, required this.creator});

  @override
  Widget build(BuildContext context) {
    const actionRowColor = Colors.white;
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
                              OutlinedButton(
                                onPressed: () {},
                                style: OutlinedButton.styleFrom(
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
                                    'Follow'.toUpperCase(),
                                    style: const TextStyle(
                                      color: actionRowColor,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ),
                              OutlinedButton(
                                onPressed: () {},
                                style: OutlinedButton.styleFrom(
                                  shape: const CircleBorder(),
                                  side: const BorderSide(
                                    color: actionRowColor,
                                    width: 0.5,
                                    style: BorderStyle.solid,
                                  ),
                                ),
                                child: const Padding(
                                  padding: EdgeInsets.all(8.0),
                                  child: Icon(
                                    Icons.notification_add_outlined,
                                    color: actionRowColor,
                                    size: 30,
                                  ),
                                ),
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
              height: 60,
            ),
            const ContentCard(),
            const SizedBox(
              height: 30,
            ),
          ],
        ));
  }
}
