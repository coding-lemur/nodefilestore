export default class FileViewModel {
    constructor(file) {
        if (!file) {
            return;
        }

        this.name = file.name;
        this.size = file.size;
        this.mimeType = file.type;
        this.date = file.lastModifiedDate;
        this.originalFile = file;

        this.uploadedPercentage = 0;
        this.isUploading = false;
        this.isUploadFinished = false;
        this.downloadToken = undefined;
        this.expirationDate = undefined;
        this.downloadUrl = undefined;
    }
}