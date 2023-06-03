import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const DirtyApp());
}

class DirtyApp extends StatelessWidget {
  const DirtyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => DirtyAppState(),
      child: MaterialApp(
        title: 'Dirty Flutter App',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrangeAccent),
        ),
        home: DirtyHomePage(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

class DirtyAppState extends ChangeNotifier {
  var current = WordPair.random();

  void getNext() {
    current = WordPair.random();
    notifyListeners();
  }

  var favorites = <WordPair>[];

  void toggleFavorite() {
    if (favorites.contains(current)) {
      favorites.remove(current);
    } else {
      favorites.add(current);
    }
    notifyListeners();
  }

  bool isFavorite() {
    return favorites.contains(current);
  }
}

class DirtyHomePage extends StatefulWidget {
  @override
  State<DirtyHomePage> createState() => _DirtyHomePageState();
}

class _DirtyHomePageState extends State<DirtyHomePage> {
  var selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget page;
    switch (selectedIndex) {
      case 0:
        page = GeneratorPage();
        break;
      case 1:
        page = FavoritesPage();
        break;
      default:
        throw UnimplementedError('no widget for index $selectedIndex');
    }

    return LayoutBuilder(builder: (context, constraints) {
      return Scaffold(
          body: Row(
        children: [
          SafeArea(
              child: NavigationRail(
            extended: constraints.maxWidth > 500,
            destinations: [
              NavigationRailDestination(
                icon: Icon(Icons.home),
                label: Text('Home'),
              ),
              NavigationRailDestination(
                icon: Icon(Icons.favorite),
                label: Text('Favorites'),
              ),
            ],
            selectedIndex: selectedIndex,
            onDestinationSelected: (value) {
              setState(() {
                selectedIndex = value;
              });
            },
          )),
          Expanded(
            child: Container(
                color: Theme.of(context).colorScheme.primaryContainer,
                child: page),
          )
        ],
      ));
    });
  }
}

class GeneratorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<DirtyAppState>();
    var pair = appState.current;

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [BigCard(pair: pair), SizedBox(height: 5), ActionButtons()],
      ),
    );
  }
}

class ActionButtons extends StatelessWidget {
  const ActionButtons({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    var appState = context.watch<DirtyAppState>();
    IconData icon;
    if (appState.isFavorite()) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        ElevatedButton.icon(
          onPressed: () {
            appState.toggleFavorite();
          },
          icon: Icon(icon),
          label: Text('Like'),
        ),
        SizedBox(width: 10),
        ElevatedButton(
            onPressed: () {
              appState.getNext();
            },
            child: Text('New Word')),
      ],
    );
  }
}

class BigCard extends StatelessWidget {
  const BigCard({
    super.key,
    required this.pair,
  });

  final WordPair pair;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final style = theme.textTheme.displayMedium!.copyWith(
      color: theme.colorScheme.onPrimary,
    );

    return Card(
      color: theme.colorScheme.primary,
      child: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Text(
          pair.asLowerCase,
          style: style,
          semanticsLabel: "${pair.first} ${pair.second}",
        ),
      ),
    );
  }
}

class FavoritesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<DirtyAppState>();
    var favorites = appState.favorites;

    if (favorites.isEmpty) {
      return Center(
        child: Text('No favorites yet'),
      );
    }

    return ListView(
      children: [
        Padding(
          padding: const EdgeInsets.all(15),
          child: Text(
            'You have ${favorites.length} favorites',
          ),
        ),
        for (var pair in favorites)
          ListTile(
            leading: Icon(Icons.favorite),
            title: Text(pair.asLowerCase),
          ),
      ],
    );
  }
}
