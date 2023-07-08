# Feathers

A cross-platform app to explore a creators page for Onefootball.

Built using Flutter.

## Setup

See [instructions in the root folder](../) for basic setup.

To generate icons, run:

```bash
dart run flutter_launcher_icons
```

## BFF

The app relies on a BFF to provide data. This is deployed in the form of serverless functions.

## Running the BFF (locally)

To run the BFF locally, see [the BFF README](./bff/).

## Building for Web

To build for web, run:

```bash
flutter create --platforms web .
flutter build web
```

The `build/web` folder can deployed as a static build.
Example deployment (View with a width of ~350px for best results) : https://of-shoulders.sarincasm.com/
