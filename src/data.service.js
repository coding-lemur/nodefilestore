export default class DataService {
    constructor($q) {
        this.$q = $q;
    }

    uploadFile(file) {
        var deferred = this.$q.defer();
        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', e => {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                deferred.notify(percentage);
            }
        });

        xhr.upload.addEventListener('load', e => {
            deferred.resolve();
        });

        xhr.upload.addEventListener('error', e => {
            deferred.reject(e);
        });

        xhr.upload.addEventListener('abort', e => {
            deferred.reject('upload aborted');
        });

        var formData = new FormData();
        formData.append('myFile', file.originalFile);

        xhr.open('POST', '/upload', true);
        xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
        xhr.send(formData);

        return deferred.promise;
    }
}

DataService.$inject = ['$q'];