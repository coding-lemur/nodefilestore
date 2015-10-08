import FileViewModel from './viewmodels/file.viewmodel';
import { FilePickerEventKeys } from './FilePicker/filePicker.directive';

export default class MainController {
    constructor($scope) {
        this.$scope = $scope;
        this.files = [];

        this.$scope.$on(FilePickerEventKeys.FilesSelected, (event, args) => {
            event.stopPropagation();

            if (!args || !args.files) {
                return;
            }

            for (var i = 0; i < args.files.length; i++) {
                var file = args.files[i];
                this.files.push(new FileViewModel(file));
            }

            this.uploadFiles();
        });
    }

    uploadFiles() {
        for (var file of this.files) {
            file.upload(this.$scope);
        }
    }
}

MainController.$inject = ['$scope'];