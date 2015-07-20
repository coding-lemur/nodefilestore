(function () {
    'use strict';
    var files = [];

    window.onload = function() {
        var fileList = document.querySelector('ul.file-list');

        var filesToUpload = document.getElementById('fileToUpload');
        filesToUpload.addEventListener('change', function(e) {
            var file = filesToUpload.files[0];

            var fileItem = document.createElement('li');
            fileItem.className = 'collection-item';
            var label = document.createTextNode(file.name + ' (' + file.size + ' bytes)');
            fileItem.appendChild(label);
            fileList.appendChild(fileItem);

            files.push(file);

            /*
            for (var i = 0; i < filesToUpload.files.length; i++) {
                var file = filesToUpload.files[i];

                console.log(file.name, file.size + ' bytes', file.type);
                files.push(file);
            }
            */
        }, false);

        var uploadButton = document.getElementById('upload-button');

        uploadButton.addEventListener('click', function(e) {
            e.preventDefault();

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                console.log(file.name);

                var progress = document.querySelector('.progress > .determinate');
                //progress.style.width = '0%';

                var reader = new FileReader();
                var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                var chunkSize = 2097152; // 2MB
                var chunks = Math.ceil(file.size / chunkSize);
                var currentChunk = 0;
                var spark = new SparkMD5.ArrayBuffer();

                var loadNext = function() {
                    var start = currentChunk * chunkSize;
                    var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                    reader.readAsArrayBuffer(blobSlice.call(file, start, end));
                };

                /*
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
                */

                reader.addEventListener('load', function(e) {
                    console.log('read chunk nr', currentChunk + 1, 'of', chunks);

                    var percentage = Math.round(((currentChunk + 1) * 100) / chunks);
                    progress.style.width = percentage + '%';

                    spark.append(e.target.result); // append array buffer
                    currentChunk++;

                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        console.log('finished loading');
                        console.info('computed hash', spark.end());  // compute hash
                    }
                }, false);
                reader.addEventListener('error', function() {
                    console.warn('oops, something went wrong.');
                });

                progress.style.width = '0%';
                loadNext();
            }
        }, false);
    }
})();