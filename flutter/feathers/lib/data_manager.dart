import 'dart:convert';
import 'package:http/http.dart' as http;

import 'data.dart';

class RootState {
  int navigationIndex = 0;
  String showCreatorId = '0';

  User user = User(
    following: List.empty(growable: true),
  );

  CreatorsList creatorsList = CreatorsList(
    creators: List.empty(growable: true),
  );

  List<HomeSection> homeSections = [];

  static const url = 'http://localhost:3000';

  getCreator(String creatorId) {
    return creatorsList.creators.firstWhere(
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
          sectionMetaData.contentSummaries.add(ContentSummary.fromJson(item));
        }
        homeSections.add(sectionMetaData);
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
}
