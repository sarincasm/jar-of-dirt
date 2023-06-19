import 'package:flutter/material.dart';

import 'package:feathers/discover.dart';
import 'package:feathers/following.dart';
import 'package:feathers/home.dart';
import 'package:feathers/creator.dart';
import 'package:feathers/splash.dart';

import 'data_manager.dart';

const showBottomNavigationBar = true;

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
        (const HSLColor.fromAHSL(0.9, 0, 0, .941)).toColor();

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        extendBody: true,
        bottomNavigationBar: showBottomNavigationBar
            ? BottomNavigationBar(
                backgroundColor: navigationBackgroundColor,
                elevation: 0,
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
                items: [
                  BottomNavigationBarItem(
                    icon: const Icon(Icons.home_outlined),
                    activeIcon: const Icon(Icons.home),
                    label: 'Home',
                    backgroundColor: navigationBackgroundColor,
                  ),
                  const BottomNavigationBarItem(
                    icon: Icon(Icons.favorite_border_outlined),
                    activeIcon: Icon(Icons.favorite),
                    label: 'Following',
                  ),
                  const BottomNavigationBarItem(
                    icon: Icon(Icons.explore_outlined),
                    activeIcon: Icon(Icons.explore),
                    label: 'Discover',
                  ),
                  const BottomNavigationBarItem(
                    icon: Icon(Icons.emoji_nature_outlined),
                    activeIcon: Icon(Icons.emoji_nature),
                    label: 'Imagine',
                  )
                ],
              )
            : null,
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
                        key: const ValueKey('1'),
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
                    key: const ValueKey('2'),
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

                case 3:
                  return Discover(
                    key: const ValueKey('3'),
                    variant: Variant.imagine,
                    creatorsList: rootState.creatorsImagineList,
                    user: rootState.user,
                    onClickCreator: (creatorId) async {},
                    onClickFollowButton: (creatorId) {},
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
