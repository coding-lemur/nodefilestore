import React from 'react';

import AddFilesButton from './add-files-button';
import EmptyFiles from './empty-files';
import FilledFiles from './filled-files';
import DataService from '../helper/data-service';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            uploading: false
        };
    }

    render() {
        var filesContainerNode;

        if (this.state.files.length === 0) {
            filesContainerNode = <EmptyFiles />;
        }
        else {
            filesContainerNode = <FilledFiles files={this.state.files}
                                              disableActionArea={this.state.uploading}
                                              showDeleteButtons={!this.state.uploading}
                                              onDeleteFile={this.handleDeleteFile.bind(this)}
                                              onClearFiles={this.handleClearFiles.bind(this)}
                                              onUploadFiles={this.handleFilesUpload.bind(this)} />;
        }

        return (
            <div className="upload-form">
                {filesContainerNode}
                <AddFilesButton disabled={this.state.uploading}
                                onFilesAdded={this.handleFilesAdded.bind(this)} />
            </div>
        );
    }

    handleFilesAdded(files) {
        this.setState({ files: this.state.files.concat(files) });
    }

    handleFilesUpload() {
        var dataService = new DataService();
        var notify = (file, fileIndex) => {
            var newFiles = this.state.files;
            newFiles[fileIndex] = file;

            this.setState({ files: newFiles });
        };
        dataService.uploadFiles(this.state.files, notify)
            .then((response) => {
                console.log('upload finished', response);
                this.setState({ uploading: false });
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