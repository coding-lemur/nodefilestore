export default class UploadViewModel {
    constructor(token, expirationDate) {
        this.token = token;
        this.expirationDate = expirationDate;
    }

    get downloadUrl() {
        return `/api/download/${this.token}`;
    }
}