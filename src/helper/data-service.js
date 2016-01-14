export default class DataService {
    uploadFiles(files, notifyCallback) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var fileIndex = 0;
            var currentFile = files[fileIndex];
            var loadedPreviousFiles = 0;

            xhr.upload.addEventListener('progress', e => {
                if (!e.lengthComputable) {
                    return;
                }

                currentFile.isUploading = true;

                // calculate percentage for each file
                var currentFileLoaded = e.loaded - loadedPreviousFiles;
                var currentFileTotal = currentFile.size;

                if (currentFileLoaded >= currentFileTotal) { // upload for current is finished
                    currentFile.isUploading = false;
                    currentFile.isUploadFinished = true;

                    loadedPreviousFiles += currentFile.size;

                    if (fileIndex < files.length - 1) {
                        // switch to next file
                        fileIndex++;
                        currentFile = files[fileIndex];
                    }
                }
                else {
                    currentFile.uploadedPercentage = Math.round((currentFileLoaded * 100) / currentFileTotal);
                }

                notifyCallback(currentFile, fileIndex);
            });

            xhr.upload.addEventListener('load', e => { // upload finished
                // do nothing
            });

            xhr.addEventListener('readystatechange', () => {
                if ((xhr.readyState === 4) && (xhr.status === 201)) { // response download finished
                    resolve(JSON.parse(xhr.responseText));
                }
            });

            xhr.upload.addEventListener('error', e => {
                reject(e);
            });

            xhr.upload.addEventListener('abort', e => {
                reject('upload aborted');
            });

            var formData = new FormData();

            files.forEach((file) => {
                formData.append('files', file.originalFile);
            });

            // start upload
            xhr.open('POST', '/api/upload', true);
            xhr.overrideMimeType('application/json');
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send(formData);
        });
    }
}