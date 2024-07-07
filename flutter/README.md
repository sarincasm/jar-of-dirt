# Flutter

## In this Folder

-  [Feathers](feathers/)
-  [Dart OOO](dart-ooo/)
-  [Dirty Flutter](dirty_flutter/)
-  [Frontend Masters - Coffee App](fem_coffee/)

## Platform Setup

https://docs.flutter.dev/get-started/install/macos

```
sudo softwareupdate --install-rosetta --agree-to-license
brew install --cask flutter
flutter doctor
```

### iOS Setup

Install xcode

```
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

Run the simulator

Create a new project

```
flutter create my_app
cd my_app
flutter run
```

### Platform Folders and Files

Platform project folders can be recreated with the following command:

```
flutter create .
flutter create --platforms=ios .
flutter create --platforms=android,ios .
```

### Deploying to an iOS Device

https://docs.flutter.dev/get-started/install/macos#deploy-to-ios-devices

```
open ios/Runner.xcworkspace
```

### Building in Release Mode

To be able to launch the app on ios directly, it must be built in release mode.

```
flutter run --release
```

## Useful IDE Tips

VS Code Commands

-  Flutter: Select Device
-  Debug: Start Debugging
-  Flutter: Toggle Debug Painting
-  Debug: Stop

Snippets

-  `stls` - `StatelessWidget`
-  `stf` - `StatefulWidget`

## Useful Links

-  https://flutter.dev/learn
-  https://dartpad.dev/
