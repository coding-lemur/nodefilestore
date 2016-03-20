# nodefilestore
[![Dependency Status](https://david-dm.org/MCeddy/nodefilestore.svg)](https://david-dm.org/MCeddy/nodefilestore)
## description
This is a very lightweight filesharing service base on nodejs and mongodb/GridFS.
For the frontend we using react and ES6.
Files can upload and download without registration. Each file will expiring after 7 days and will totally removed from the database by an nightly task.

Special thanks to Christian Alfoni: This project is base on his [webpack-express-boilerplate](https://github.com/christianalfoni/webpack-express-boilerplate).

## features
- cross-platform (nodejs)
- modern frontend (react with ES6)
- completely ES6 (backend and frondend)
- streaming files into mongoDB (GridFS)
- anonymous uploading
- auto cleanup of expired files
- open source (MIT)

## setup
- first make sure you have an mongodb instance running and enough free space for uploaded files
- make sure you have nodejs installed (recommended version >= 4.0)
- copy the whole project to any folder on your server
- goto command line and switch to the project folder
- open config/default.json and change the connection string for your own mongodb server
- run `npm install` to download all backend dependencies from the global nodejs repository
- install bower with `npm install bower -g`
- run `bower install` to download all frontend dependencies
- install webpack and required plugins
- run `npm run build` to build frontend scripts with webpack
- start webapp with "node bin/www"
- open `http://localhost:3000` in your browser
- optionally:
 - install Python (>= 3.0)
 - open `/clean-up/cleanup.py` in editor
 - change connection string to your MongoDB instance
 - setup an daily job for running the script on your OS

## changelog
### 1.1.5
- no new features
- many refactoring and optimizations in backend
- converted backend code to ES6 (will transpiled with Babel)
- integrated ESlint
- integrated Mocha testing framework
- startet with testing

### 1.1.1
- fixed missing DateFormat library (used momentjs instead)
- updated npm and bower dependencies
- some style changes

### 1.1.0
- switched frontend library from AngularJS to React
- support of multiple files -> will bundled into an ZIP container on downloading

### 1.0.0
- support of single file upload and downloading
- AngularJS frontend

## TODO
- [ ] write tests
- [ ] drag & drop
- [ ] instant uploads
- [ ] notify uploader after download
