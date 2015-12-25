import FileViewModel from './../viewmodels/file.viewmodel';
import { FilePickerEventKeys } from './../filepicker/filePicker.directive';

export default class UploadController {
    constructor($scope, $location, dataService) {
        this.$scope = $scope;
        this.$location = $location;
        this.dataService = dataService;

        this.files = [];
        this.fileIndex = 0;
        this.isUploading = false;

        this.$scope.$on(FilePickerEventKeys.FilesSelected, (e, args) => {
            e.stopPropagation();

            if (!args || !args.files) {
                return;
            }

            // add files to queue
            for (var i = 0; i < args.files.length; i++) {
                this.files.push(new FileViewModel(args.files[i]));
            }
        });
    }

    clear() {
        this.files = [];
    }

    removeFromList(file) {
        if (!file) {
            return;
        }

        var index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
        }
    }

    startUpload() {
        //this.isUploading = true;
        //this.processQueue();
    }

    processQueue() {
        if (this.fileIndex >= this.files.length) {
            return;
        }

        var file = this.files[this.fileIndex];

        this.dataService.uploadFile(file)
            .then(data => { // successful
                this.fileIndex++;
                this.isUploading = false;

                file.isUploadFinished = true;

                if (data) {
                    file.downloadToken = data.token;
                    file.downloadUrl = data.downloadUrl;
                    file.expirationDate = data.expirationDate;
                }
            }, e => { // error
                console.error(e);
            }, percentage => { // notify
                file.uploadedPercentage = percentage;
            });
    }
}

UploadController.$inject = ['$scope', '$location', 'dataService'];