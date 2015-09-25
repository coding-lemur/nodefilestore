//import FileViewModel from './viewmodels/File.viewmodel';
import FilePickerEventKeys from './FilePicker/FilePicker.directive';

export default class MainController {
    constructor($scope) {
        this.$scope = $scope;
        //this.files = [new FileViewModel(), new FileViewModel(), new FileViewModel()];

        this.$scope.$on(FilePickerEventKeys.FilesSelected, (event, args) => {
            event.stopPropagation();

            alert('exy');
        });
    }

    addFile() {
        alert('add me!');
    }
}

MainController.$inject = ['$scope'];