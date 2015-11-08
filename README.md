# nodefilestore
This is a very small file upload service base on nodejs and mongodb/GridFS.
For the frontend we using AngularJS.
Files can Upload without registration. Each file will expiring after 7 days and will totally removed from the databse by an nightly task (see "nodefilestore-cleanup" repository).

Try demo: http://files.coding-lemur.de/
