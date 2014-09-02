## Setup and Build

1. Install npm (http://nodejs.org)
2. Install cordova
  ```
  npm install -g cordova
  ```
3. Navigate to root directory of project
4. Add the wikitude plugin (this could take a while)
  ```
  cordova plugin add https://github.com/Wikitude/wikitude-phonegap
  ```
5. Add iOS platform
  ```
  cordova platform add ios
  ```
6. Build the project
  ```
  cordova build
  ```
