export class FilePickerEventKeys {
    /**
     * @return {string}
     */
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
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', () => {
        $scope.$apply(() => {
            $scope.$emit(FilePickerEventKeys.FilesSelected, { files: fileInput.files });
        });

        // reset input element
        fileInput.value = '';
    });

    angular.element(fileInput).insertAfter($element);

    $element.on('click', () => {
        fileInput.click();
    });
}