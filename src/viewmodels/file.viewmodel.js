export default class FileViewModel {
    constructor(file) {
        if (!file) {
            return;
        }

        this.name = file.name;
        this.size = file.size;
        this.mimeType = file.type;
        this.date = file.lastModifiedDate;
    }
}