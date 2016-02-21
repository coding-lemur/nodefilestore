from pymongo import MongoClient
import gridfs
import datetime

today = datetime.datetime.today()

client = MongoClient("mongodb://localhost:27017/nodefilestore")
db = client.nodefilestore
fs = gridfs.GridFS(db)

expiredUploadIDs = []
expiredFileIDs = []
usedFileIDs = []
totalFilesDeleted = 0

# collect expired uploads
uploads = db.uploads.find()
for upload in uploads:
    if upload["expirationDate"] < today:  # expired
        expiredUploadIDs.append(upload["_id"])
        expiredFileIDs.extend(upload["files"])
    else:
        usedFileIDs.extend(upload["files"])

if len(expiredUploadIDs) == 0:
    print("no expired uploads")
else:
    print("%s expired upload(s)" % len(expiredUploadIDs))

    # delete expired uploads (metadata)
    result = db.uploads.delete_many({"_id": {"$in": expiredUploadIDs}})

    if result.deleted_count == 0:
        print("no uploads deleted")
    else:
        print("deleted %s upload(s)" % result.deleted_count)

    # remove expired files (from GridFS)
    for fileID in expiredFileIDs:
        result = fs.delete(fileID)
        totalFilesDeleted += 1

# remove orphaned files
orphanedFiles = fs.find({"_id": {"$nin": usedFileIDs}})

for file in orphanedFiles:
    fs.delete(file._id)
    totalFilesDeleted += 1

if totalFilesDeleted == 0:
    print("no files removed")
else:
    print("files removed: %s" % totalFilesDeleted)
