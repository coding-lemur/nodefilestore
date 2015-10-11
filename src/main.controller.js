import FileViewModel from './viewmodels/file.viewmodel';
import { FilePickerEventKeys } from './FilePicker/filePicker.directive';

export default class MainController {
    constructor($scope, dataService) {
        this.$scope = $scope;
        this.dataService = dataService;
        this.files = [];

        this.$scope.$on(FilePickerEventKeys.FilesSelected, (e, args) => {
            e.stopPropagation();

            if (!args || !args.files) {
                return;
            }

            for (var i = 0; i < args.files.length; i++) {
                var file = args.files[i];
                this.files.push(new FileViewModel(file));
            }

            this.processQueue(0);
        });
    }

    processQueue(index) {
        console.log('startUpload()', index);

        if (index >= this.files.length) {
            return;
        }

        var file = this.files[index];

        index++;

        this.dataService.uploadFile(file)
            .then(() => { // successful
                console.log('upload finished');
                this.processQueue(index);
            }, e => { // error
                console.error(e);
                this.processQueue(index);
            }, percentage => { // notify
                console.log(percentage);
                file.uploadedPercentage = percentage;
            });
    }
}

MainController.$inject = ['$scope', 'dataService'];