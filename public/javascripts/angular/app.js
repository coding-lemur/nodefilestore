(function () {
    angular
        .module('UploadApp', [])
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;

        vm.files = [new FileViewModel(), new FileViewModel(), new FileViewModel()];

        vm.addFile = addFile;

        function addFile() {
            alert('add me!');
        }

        function FileViewModel() {
            this.name = 'name';
            this.size = 100;
            this.mimeType = 'pdf';
            this.showProgress = false;
        }
    }
})();