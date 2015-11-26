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

        xhr.upload.addEventListener('load', e => { // upload finished
            // do nothing
        });

        xhr.addEventListener('readystatechange', () => {
            if ((xhr.readyState === 4) && (xhr.status === 201)) { // response download finished
                deferred.resolve(JSON.parse(xhr.responseText));
            }
        });

        xhr.upload.addEventListener('error', e => {
            deferred.reject(e);
        });

        xhr.upload.addEventListener('abort', e => {
            deferred.reject('upload aborted');
        });

        var formData = new FormData();
        formData.append('files', file.originalFile);

        xhr.open('POST', '/api/upload', true);
        xhr.overrideMimeType('application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(formData);

        return deferred.promise;
    }
}

DataService.$inject = ['$q'];