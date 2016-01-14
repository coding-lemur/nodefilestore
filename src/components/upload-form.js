import React from 'react';

import AddFilesButton from './add-files-button';
import EmptyFiles from './empty-files';
import FilledFiles from './filled-files';
import DataService from '../helper/data-service';
import dateFormat from 'dateformat';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            uploading: false,
            uploadFinished: false,
            downloadUrl: '',
            expirationDate: '',
            token: ''
        };
    }

    render() {
        var filesContainerNode;
        if (this.state.files.length === 0) {
            filesContainerNode = <EmptyFiles />;
        }
        else {
            filesContainerNode = <FilledFiles files={this.state.files}
                                              disableActionArea={this.state.uploading || this.state.uploadFinished}
                                              showDeleteButtons={!(this.state.uploading || this.state.uploadFinished)}
                                              onDeleteFile={this.handleDeleteFile.bind(this)}
                                              onClearFiles={this.handleClearFiles.bind(this)}
                                              onUploadFiles={this.handleFilesUpload.bind(this)} />;
        }

        var resultNode;
        if (this.state.uploadFinished) {
            resultNode = (
                <div className="result-container">
                    <p>download-url: <a href={this.state.downloadUrl}>{this.state.downloadUrl}</a></p>
                    <p className="download-expires">expires on {dateFormat(this.state.expirationDate)}</p>
                </div>
            );
        }

        return (
            <div className="upload-form">
                {filesContainerNode}
                {resultNode}
                <AddFilesButton disabled={this.state.uploading}
                                onFilesAdded={this.handleFilesAdded.bind(this)} />
            </div>
        );
    }

    handleFilesAdded(files) {
        if (this.state.uploadFinished) {
            // reset view
            this.setState({
                files: files,
                uploading: false,
                uploadFinished: false,
                downloadUrl: '',
                expirationDate: '',
                token: ''
            });
        }
        else {
            // add files to current queue
            this.setState({ files: this.state.files.concat(files) });
        }
    }

    handleFilesUpload() {
        var dataService = new DataService();
        var notify = (file, fileIndex) => {
            var newFiles = this.state.files;
            newFiles[fileIndex] = file;

            this.setState({ files: newFiles });
        };
        dataService.uploadFiles(this.state.files, notify)
            .then((response) => { // upload finished
                this.setState({
                    uploading: false,
                    uploadFinished: true,
                    downloadUrl: response.downloadUrl,
                    expirationDate: response.expirationDate,
                    token: response.token
                });
            },
            (error) => {
                console.error(error);
                this.setState({ uploading: false });
            });
        this.setState({ uploading: true });
    }

    handleClearFiles() {
        this.setState({ files: [] });
    }

    handleDeleteFile(file) {
        if (!file) {
            return;
        }

        var files = this.state.files;
        var index = files.indexOf(file);

        if (index > -1) {
            files.splice(index, 1);
            this.setState({ files: files });
        }
    }
}