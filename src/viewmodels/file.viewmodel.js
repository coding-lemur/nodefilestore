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
    }

    upload($scope) {
        var formData = new FormData();
        formData.append('myFile', this.originalFile);

        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                console.log(percentage);

                if ($scope) {
                    $scope.$apply(() => {
                        this.uploadedPercentage = percentage;
                    });
                }
                else {
                    this.uploadedPercentage = percentage;
                }
            }
        });

        xhr.upload.addEventListener('load', (e) => {
            console.log('upload finished');
        });

        xhr.open('POST', '/upload', true);
        xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
        xhr.send(formData);
    }
}