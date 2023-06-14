import 'package:flutter/material.dart';

import 'package:feathers/discover.dart';
import 'package:feathers/following.dart';
import 'package:feathers/home.dart';
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
    var navigationBackgroundColor =
        (const HSLColor.fromAHSL(1.0, 0, 0, .941)).toColor();

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        bottomNavigationBar: BottomNavigationBar(
          backgroundColor: navigationBackgroundColor,
          currentIndex: rootState.navigationIndex,
          onTap: (index) {
            setState(() {
              rootState.navigationIndex = index;
              rootState.showCreatorId = '0';
              rootState.retainDiscoveryState = false;
            });
          },
          selectedItemColor: Colors.black,
          selectedFontSize: 18,
          unselectedItemColor: Colors.black.withOpacity(.5),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_outlined),
              activeIcon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.favorite_border_outlined),
              activeIcon: Icon(Icons.favorite),
              label: 'Following',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.explore_outlined),
              activeIcon: Icon(Icons.explore),
              label: 'Discover',
            ),
          ],
        ),
        body: FutureBuilder(
          future: rootState.getCreatorsList(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              if (rootState.showCreatorId != '0') {
                var creator = rootState.getCreator(rootState.showCreatorId);
                return CreatorProfile(
                  creator: creator,
                  onClickFollowButton: () {
                    setState(() {
                      rootState.toggleFollow(rootState.showCreatorId);
                    });
                  },
                  onClickNotificationButton: () {
                    setState(() {
                      rootState.toggleGetNotified(rootState.showCreatorId);
                    });
                  },
                  isFollowing: creator.isFollowing(rootState.user),
                  isGettingNotified: creator.isGetNotified(rootState.user),
                );
              }

              switch (rootState.navigationIndex) {
                case 0:
                  return Home(
                    homeSections: rootState.homeSections,
                    onClickCreator: (creatorId) async {
                      setState(() {
                        rootState.showCreatorId = creatorId;
                      });
                      await rootState.ensureCreatorContentSummaries(creatorId);
                      setState(() {});
                    },
                  );
                case 1:
                  {
                    var contentSummaries =
                        rootState.getFollowingContentSummaries();

                    if (contentSummaries.isEmpty ||
                        rootState.retainDiscoveryState) {
                      return Discover(
                        variant: Variant.following,
                        creatorsList: rootState.creatorsList,
                        user: rootState.user,
                        onClickCreator: (creatorId) async {
                          setState(() {
                            rootState.showCreatorId = creatorId;
                          });
                          await rootState
                              .ensureCreatorContentSummaries(creatorId);
                          setState(() {});
                        },
                        onClickFollowButton: (creatorId) {
                          setState(() {
                            rootState.retainDiscoveryState = true;
                            rootState.toggleFollow(creatorId);
                          });
                        },
                      );
                    } else {
                      return Following(
                        contentSummaries:
                            rootState.getFollowingContentSummaries(),
                        onClickCreator: (creatorId) async {
                          setState(() {
                            rootState.showCreatorId = creatorId;
                          });
                          await rootState
                              .ensureCreatorContentSummaries(creatorId);
                          setState(() {});
                        },
                      );
                    }
                  }

                case 2:
                  return Discover(
                    creatorsList: rootState.creatorsList,
                    user: rootState.user,
                    onClickCreator: (creatorId) async {
                      setState(() {
                        rootState.showCreatorId = creatorId;
                      });
                      await rootState.ensureCreatorContentSummaries(creatorId);
                      setState(() {});
                    },
                    onClickFollowButton: (creatorId) {
                      setState(() {
                        rootState.toggleFollow(creatorId);
                      });
                    },
                  );
                default:
                  return Home(
                    homeSections: rootState.homeSections,
                    onClickCreator: (creatorId) async {
                      setState(() {
                        rootState.showCreatorId = creatorId;
                      });
                      await rootState.ensureCreatorContentSummaries(creatorId);
                      setState(() {});
                    },
                  );
              }
            } else {
              return const Splash();
            }
          },
        ),
      ),
    );
  }
}
