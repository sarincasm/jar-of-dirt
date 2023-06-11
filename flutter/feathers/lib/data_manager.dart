import 'dart:convert';
import 'package:http/http.dart' as http;

import 'data.dart';

class RootState {
  User user = User(
    following: List.empty(growable: true),
  );

  CreatorsList creatorsList = CreatorsList(
    creators: List.empty(growable: true),
  );

  static const url = 'http://localhost:3000';

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
      for (var creator in json) {
        creatorsList.creators.add(Creator.fromJson(creator));
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
