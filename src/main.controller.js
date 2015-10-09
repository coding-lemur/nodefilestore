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

            this.startUpload();
        });
    }

    startUpload() {
        for (let file of this.files) {
            this.dataService.uploadFile(file)
                .then(() => { // successful
                    console.log('upload finished');
                }, e => { // error
                    console.error(e);
                }, percentage => { // notify
                    console.log(percentage);
                    file.uploadedPercentage = percentage;
                });
        }
    }
}

MainController.$inject = ['$scope', 'dataService'];