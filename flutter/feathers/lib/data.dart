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

  Creator({
    required this.creatorId,
    required this.creatorName,
    required this.creatorImageUrl,
    required this.followerCount,
    required this.lang,
  });
}
