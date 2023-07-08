class Following {
  String creatorId;
  bool notificationsOn;

  Following({
    required this.creatorId,
    required this.notificationsOn,
  });
}

class User {
  List<Following> following;

  User({
    required this.following,
  });
}

class Creator {
  final String creatorId;
  final String creatorName;
  final String creatorImageUrl;
  final int followerCount;
  final String lang;

  final List<ContentSummary> contentSummaries = List.empty(growable: true);

  bool isFollowing(User user) {
    return user.following.any((element) => element.creatorId == creatorId);
  }

  bool isGetNotified(User user) {
    if (!isFollowing(user)) {
      return false;
    }

    return user.following
        .firstWhere((element) => element.creatorId == creatorId)
        .notificationsOn;
  }

  Creator.fromJson(Map<String, dynamic> json)
      : creatorId = json['creatorId'],
        creatorName = json['creatorName'],
        creatorImageUrl = json['creatorImageUrl'],
        followerCount = json['followerCount'],
        lang = json['lang'];

  Creator({
    required this.creatorId,
    required this.creatorName,
    required this.creatorImageUrl,
    required this.followerCount,
    required this.lang,
  });
}

class CreatorsList {
  final List<Creator> creators;

  CreatorsList({
    required this.creators,
  });
}

class ContentSummary {
  final String id;
  final String title;
  final String creatorId;
  final String creatorImageUrl;
  final String imageUrl;
  final String time;

  ContentSummary({
    required this.id,
    required this.title,
    required this.creatorId,
    required this.creatorImageUrl,
    required this.imageUrl,
    required this.time,
  });

  ContentSummary.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        title = json['title'],
        creatorId = json['creatorId'],
        creatorImageUrl = json['creatorImageUrl'],
        imageUrl = json['imageUrl'],
        time = json['time'];
}

class HomeSection {
  final String title;
  final String subtitle;
  final List<ContentSummary> contentSummaries;

  HomeSection({
    required this.title,
    required this.subtitle,
    required this.contentSummaries,
  });

  HomeSection.fromJson(Map<String, dynamic> json)
      : title = json['title'],
        subtitle = json['subtitle'],
        contentSummaries = List.empty(growable: true);
}
