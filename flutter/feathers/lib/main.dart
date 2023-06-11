import 'package:feathers/creator.dart';
import 'package:feathers/data.dart';
// import 'package:feathers/splash.dart';
import 'package:flutter/material.dart';

import 'data_manager.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  final rootState = RootState();

  final Creator creator = Creator(
      creatorId: '5936',
      lang: 'en',
      creatorName: 'Her Football Hub',
      creatorImageUrl:
          'https://filebucket.onefootball.com/2023/5/1684696621150-blob',
      followerCount: 130119);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: CreatorProfile(
          creator: creator,
          onClickFollowButton: () {
            setState(() {
              rootState.toggleFollow(creator.creatorId);
            });
          },
          onClickNotificationButton: () {
            setState(() {
              rootState.toggleGetNotified(creator.creatorId);
            });
          },
          isFollowing: creator.isFollowing(rootState.user),
          isGettingNotified: creator.isGetNotified(rootState.user),
        ),
      ),
    );
  }
}
