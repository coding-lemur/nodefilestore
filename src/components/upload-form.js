import React from 'react';

import EmptyFiles from './empty-files';
import FilledFiles from './filled-files';
import AddFilesButton from './add-files-button';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    render() {
        var node;

        if (this.state.files.length === 0) {
            node = <EmptyFiles />;
        }
        else {
            node = <FilledFiles files={this.state.files}
                                onClearFiles={this.handleClearFiles.bind(this)}
                                onUploadFiles={this.handleFilesUpload.bind(this)}
                                onDeleteFile={this.handleDeleteFile.bind(this)} />;
        }

        return (
            <div className="upload-form">
                {node}
                <AddFilesButton onFilesAdded={this.handleFilesAdded.bind(this)} />
            </div>
        );
    }

    handleFilesAdded(files) {
        this.setState({ files: this.state.files.concat(files) });
    }

    handleFilesUpload() {
        alert('uploading...');
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