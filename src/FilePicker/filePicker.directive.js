export class FilePickerEventKeys {
    static get FilesSelected() {
        return 'FilePicker.FilesSelected';
    }
}

export default function FilePickerDirective() {
    return {
        restrict: 'A',
        link: linkFunction
    };
}

function linkFunction($scope, $element, attributes) {
    var fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    //fileInput.setAttribute('multiple', 'true');

    fileInput.addEventListener('change', () => {
        $scope.$apply(() => {
            $scope.$emit(FilePickerEventKeys.FilesSelected, { files: fileInput.files });
        })
    });

    $element[0].addEventListener('click', () => {
        fileInput.click();
    });
}