import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:collection/collection.dart';

import 'data.dart';

class RootState {
  int navigationIndex = 0;
  String showCreatorId = '0';
  // in the following tab, we want to retain the discovery state while the user is selcting multiple creators to follow
  bool retainDiscoveryState = false;

  User user = User(
    following: List.empty(growable: true),
  );

  CreatorsList creatorsList = CreatorsList(
    creators: List.empty(growable: true),
  );

  List<HomeSection> homeSections = [];

  static const url = 'http://localhost:3000';

  getCreator(String creatorId) {
    return creatorsList.creators.firstWhereOrNull(
      (element) => element.creatorId == creatorId,
    );
  }

  Future<CreatorsList> getCreatorsList() async {
    if (creatorsList.creators.isEmpty) {
      await fetchData();
    }
    return creatorsList;
  }

  fetchData() async {
    var response = await http.get(Uri.parse('$url/'));

    if (response.statusCode == 200) {
      var json = jsonDecode(response.body);
      var creators = json['creators'];
      for (var creator in creators) {
        creatorsList.creators.add(Creator.fromJson(creator));
      }

      var sections = json['sections'];
      for (var section in sections) {
        var sectionMetaData = HomeSection.fromJson(section);
        var content = section['content'];
        for (var item in content) {
          item['creatorImageUrl'] = getCreator(item['creatorId'])
                  ?.creatorImageUrl ??
              'https://images.onefootball.com/blogs_logos/circle_onefootball.png';
          sectionMetaData.contentSummaries.add(ContentSummary.fromJson(item));
        }
        homeSections.add(sectionMetaData);
      }
    } else {
      throw Exception('Failed to load data');
    }
  }

  addNewSection(creatorId) async {
    var creator = getCreator(creatorId);

    ContentSummary contentSummary = ContentSummary(
      id: '0',
      title: 'Fetching...',
      creatorId: creator.creatorId,
      creatorImageUrl: creator.creatorImageUrl,
      imageUrl: creator.creatorImageUrl,
      time: '',
    );

    HomeSection homeSection = HomeSection(
      title: creator.creatorName,
      subtitle: 'You follow this creator',
      contentSummaries: [contentSummary],
    );

    homeSections.add(
      homeSection,
    );

    if (creator.contentSummaries.isEmpty) {
      await fetchCreatorSection(creatorId);
    }

    homeSection.contentSummaries.clear();
    for (var item in creator.contentSummaries) {
      homeSection.contentSummaries.add(item);
    }
  }

  fetchCreatorSection(creatorId) async {
    var creator = getCreator(creatorId);
    var response = await http.get(
        Uri.parse('$url/creators?creatorId=$creatorId&lang=${creator.lang}'));

    if (response.statusCode == 200) {
      var json = jsonDecode(response.body);

      creator.contentSummaries.clear();

      for (var item in json) {
        item['creatorImageUrl'] = creator.creatorImageUrl;
        creator.contentSummaries.add(ContentSummary.fromJson(item));
      }
    } else {
      throw Exception('Failed to load data');
    }
  }

  toggleFollow(String creatorId) {
    var index = 0;
    final size = user.following.length;
    while (index < size) {
      if (user.following[index].creatorId == creatorId) {
        user.following.removeAt(index);
        var creator = getCreator(creatorId);
        homeSections
            .removeWhere((element) => element.title == creator.creatorName);
        break;
      }
      index++;
    }

    if (index == size) {
      user.following.add(
        Following(
          creatorId: creatorId,
          notificationsOn: false,
        ),
      );

      addNewSection(creatorId);
    }
  }

  toggleGetNotified(String creatorId) {
    var index = 0;
    final size = user.following.length;
    while (index < size) {
      if (user.following[index].creatorId == creatorId) {
        user.following[index].notificationsOn =
            !user.following[index].notificationsOn;
        break;
      }
      index++;
    }
  }

  ensureCreatorContentSummaries(String creatorId) async {
    var creator = getCreator(creatorId);

    if (creator.contentSummaries.isEmpty) {
      await fetchCreatorSection(creatorId);
    }
  }

  getFollowingContentSummaries() {
    List<ContentSummary> contentSummaries = List.empty(growable: true);

    for (var creator in creatorsList.creators) {
      if (creator.isFollowing(user)) {
        for (var item in creator.contentSummaries) {
          contentSummaries.add(item);
        }
      }
    }

    contentSummaries.sort(
      (a, b) => b.time.compareTo(a.time),
    );

    return contentSummaries;
  }
}
