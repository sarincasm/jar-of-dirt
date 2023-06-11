import 'package:feathers/creator.dart';
import 'package:feathers/data.dart';
// import 'package:feathers/splash.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MainApp());
}

class MainApp extends StatelessWidget {
  MainApp({super.key});

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
        ),
      ),
    );
  }
}
