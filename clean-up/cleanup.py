from pymongo import MongoClient
import gridfs
import datetime


def sizeof_fmt(num, suffix='B'):
    for unit in ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi']:
        if abs(num) < 1024.0:
            return "%3.1f %s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.1f %s%s" % (num, 'Yi', suffix)


today = datetime.datetime.today()

client = MongoClient("mongodb://localhost:27017/nodefilestore")
db = client.nodefilestore

expiredFileIDs = []
expiredUploadIDs = []

# collect expired uploads
uploads = db.uploads.find({"expirationDate": {"$lt": today}})
for upload in uploads:
    print(upload["expirationDate"])

    expiredUploadIDs.append(upload["_id"])
    expiredFileIDs.extend(upload["files"])

if len(expiredFileIDs) == 0:
    print("no expired uploads")
else:
    print("%s expired uploads" % len(expiredFileIDs))

    # delete expired uploads (metadata)
    result = db.uploads.delete_many({"_id": {"$in": expiredUploadIDs}})

    if result.deleted_count == 0:
        print("no uploads deleted")
    else:
        print("deleted %s uploads" % result.deleted_count)

    # remove expired files (from GridFS)
    fs = gridfs.GridFS(db)

    totalFilesDeleted = 0
    totalStorage = 0

    for fileID in expiredFileIDs:
        file = fs.find_one({"_id": fileID})

        if file is not None:
            totalFilesDeleted += 1
            totalStorage += file.length
            fs.delete(fileID)

    if totalFilesDeleted == 0:
        print("no files removed")
    else:
        print("files removed: %s (%s)" % (totalFilesDeleted, sizeof_fmt(totalStorage)))
