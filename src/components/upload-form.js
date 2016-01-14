import React from 'react';

import AddFilesButton from './add-files-button';
import EmptyFiles from './empty-files';
import FilesList from './files-list';
import FilesActionArea from './files-action-area';
import DataService from '../helper/data-service';
import dateFormat from 'dateformat';

export default class UploadForm extends React.Component {
    static get defaultState() {
        return {
            files: [],
            uploading: false,
            uploadFinished: false,
            downloadUrl: '',
            expirationDate: '',
            token: ''
        }
    }

    constructor(props) {
        super(props);

        this.state = UploadForm.defaultState;
    }

    render() {
        var hasFiles = (this.state.files.length > 0);

        var filesContainerNode;
        if (hasFiles) {
            filesContainerNode = (
                <FilesList files={this.state.files}
                           showDeleteButtons={!(this.state.uploading || this.state.uploadFinished)}
                           onDeleteFile={this.handleDeleteFile.bind(this)} />
            );
        }
        else {
            filesContainerNode = <EmptyFiles />;
        }

        var actionAreaNode;
        if (hasFiles && !this.state.uploadFinished) {
            actionAreaNode = (
                <FilesActionArea disabled={this.state.uploading}
                                 onClearFiles={this.handleClearFiles.bind(this)}
                                 onUploadFiles={this.handleFilesUpload.bind(this)} />
            );
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
                {actionAreaNode}
                {resultNode}
                <AddFilesButton disabled={this.state.uploading}
                                onFilesAdded={this.handleFilesAdded.bind(this)} />
            </div>
        );
    }

    handleFilesAdded(files) {
        if (this.state.uploadFinished) {
            // reset view
            var newState = UploadForm.defaultState;
            newState.files = files;
            this.setState(newState);
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