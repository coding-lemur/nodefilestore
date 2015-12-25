# nodefilestore
## description
This is a very small file upload service base on nodejs and mongodb/GridFS.
For the frontend we using AngularJS.
Files can Upload without registration. Each file will expiring after 7 days and will totally removed from the databse by an nightly task (see "nodefilestore-cleanup" repository).

## features
- cross-platform (nodejs)
- modern frontend (AngularJS and ES6)
- streaming files into mongoDB (GridFS)
- anonymous uploading
- auto cleanup of expired files (see [nodefilestore-cleanup](https://github.com/MCeddy/nodefilestore-cleanup) repo)
- open source

## setup
- first make sure you have an mongodb instance running and enough free space for uploaded files
- make sure you have nodejs installed (recommended version >= 4.0)
- copy the whole project to any folder on your server
- goto command line and switch to the project folder
- open config/default.json and change the connection string for your own mongodb server
- run "npm install" to download all backend dependencies from the global nodejs repository
- install bower with "npm install bower -g"
- run "bower install" to download all frontend dependencies
- install webpack and required plugins
- run "npm run build" to build frontend scripts with webpack
- start webapp with "node bin/www"
- open "http://localhost:3000" in your browser
- optionally:
 - install Python (>= 3.0)
 - download the [cleanup script](https://github.com/MCeddy/nodefilestore-cleanup/blob/master/cleanup.py))
 - change connection string to your MongoDB instance
 - setup an daily job for running the script on your OS
