# Flutter

## In this Folder

-  [Dirty Flutter](dirty_flutter/)

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

### Deploying to an iOS Device

https://docs.flutter.dev/get-started/install/macos#deploy-to-ios-devices

```
open ios/Runner.xcworkspace
```

## Useful IDE Tips

VS Code Commands

-  Flutter: Select Device
-  Debug: Start Debugging
-  Flutter: Toggle Debug Painting
-  Debug: Stop

## Useful Links

-  https://flutter.dev/learn
-  https://dartpad.dev/
