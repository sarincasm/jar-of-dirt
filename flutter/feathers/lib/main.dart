import 'package:flutter/material.dart';

import 'package:feathers/creator.dart';
import 'package:feathers/splash.dart';

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

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: FutureBuilder(
          future: rootState.getCreatorsList(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              final creator = snapshot.data!.creators[0];
              return CreatorProfile(
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
              );
            } else {
              return const Splash();
            }
          },
        ),
      ),
    );
  }
}
