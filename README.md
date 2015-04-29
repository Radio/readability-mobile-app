# Ability to read

A Readability mobile-app for android.

## Development

### Requirements

* Node.js
* [Cordova](http://cordova.apache.org/docs/en/5.0.0/guide_overview_index.md.html#Overview)
* [Android SDK](https://developer.android.com/sdk/installing/index.html)
* bower
* jshint
* grunt

### Development and compilation

* Clone the git repo.
* Add android platform with: `cordova platform add android`.
* Download bower dependencies with: `bower install`.
* Download npm dependencies with: `npm install`.
* Build the app with: `grunt build`.
* Run grunt watcher with: `grunt watch` (in a separate console).
  Note that grunt watch won't perform ngAnnotate task.
  Always run `grunt build` or at least `grunt ngAnnotate` before building the mobile app with cordva.
* Build the mobile app with cordova: `cordova build`
  This will produce the application files inside each platform.
  (For android: platforms/android/build/outputs/apk).

For testing purposes i have a virtual host configured with 'www' folder as a document root.
Note that the application requires cordova.js file which is missing in 'www'.
This is normal. Web version doesn't need it so just ignore the 404 error in console.