class User {
  List<String> following;

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

  Creator({
    required this.creatorId,
    required this.creatorName,
    required this.creatorImageUrl,
    required this.followerCount,
    required this.lang,
  });
}
