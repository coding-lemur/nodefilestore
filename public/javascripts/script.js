(function () {
    'use strict';
    window.onload = function() {
        var uploadButton = document.getElementById('upload-button');
        var filesToUpload = document.getElementById('fileToUpload');

        uploadButton.addEventListener('click', function(e) {
            e.preventDefault();

            for (var i = 0; i < filesToUpload.files.length; i++) {
                var file = filesToUpload.files[i];
                console.log(file.name, file.size + ' bytes', file.type);

                var formData = new FormData();
                formData.append('myFile', file);

                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        var percentage = Math.round((e.loaded * 100) / e.total);
                        console.log(percentage);
                    }
                }, false);
                xhr.upload.addEventListener('load', function(e){
                    //self.ctrl.update(100);
                    console.log('upload finished');
                }, false);
                xhr.open('POST', '/upload');
                xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
                xhr.send(formData);

                /*
                var reader = new FileReader();
                reader.onload = function(e) {

                };
                reader.readAsBinaryString(file);
                */
            }
        }, false);
    }
})();