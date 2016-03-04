import React from 'react';

import AddFilesButton from './add-files-button';
import EmptyFiles from './empty-files';
import FilesList from './files-list';
import FilesActionArea from './files-action-area';
import ResultContainer from './result-container';
import DataService from '../helper/data-service';

export default class UploadForm extends React.Component {
    static get defaultState() {
        return {
            files: [],
            uploading: false,
            uploadFinished: false,
            apiResult: {
                downloadUrl: '',
                expirationDate: '',
                token: ''
            }
        };
    }

    constructor(props) {
        super(props);

        this.state = UploadForm.defaultState;
    }

    render() {
        let filesNode;
        let resultContainerNode;
        let filesActionAreaNode;

        if (this.state.files.length > 0) { // has files
            filesNode = (
                <FilesList files={this.state.files}
                           showDeleteButtons={!(this.state.uploading || this.state.uploadFinished)}
                           onDeleteFile={this.handleDeleteFile.bind(this)} />
            );

            if (this.state.uploadFinished) {
                resultContainerNode = (
                    <ResultContainer apiResult={this.state.apiResult} />
                );
            }
            else { // upload not finished
                filesActionAreaNode = (
                    <FilesActionArea disabled={this.state.uploading}
                                     onClearFiles={this.handleClearFiles.bind(this)}
                                     onUploadFiles={this.handleFilesUpload.bind(this)} />
                );
            }
        }
        else { // hasn't files
            filesNode = <EmptyFiles />;
        }

        return (
            <div className="upload-form">
                {filesNode}
                {resultContainerNode}
                {filesActionAreaNode}
                <AddFilesButton disabled={this.state.uploading}
                                onFilesAdded={this.handleFilesAdded.bind(this)} />
            </div>
        );
    }

    handleFilesAdded(files) {
        if (this.state.uploadFinished) {
            // reset view
            const newState = UploadForm.defaultState;
            newState.files = files;
            this.setState(newState);
        }
        else {
            // add files to current queue
            this.setState({ files: this.state.files.concat(files) });
        }
    }

    handleFilesUpload() {
        const dataService = new DataService();
        const notify = (file, fileIndex) => {
            const newFiles = this.state.files;
            newFiles[fileIndex] = file;

            this.setState({ files: newFiles });
        };

        this.setState({ uploading: true });

        dataService.uploadFiles(this.state.files, notify)
            .then((response) => { // upload finished
                this.setState({
                    uploading: false,
                    uploadFinished: true,
                    apiResult: {
                        downloadUrl: response.downloadUrl,
                        expirationDate: response.expirationDate,
                        token: response.token
                    }
                });
            },
            (error) => {
                console.error(error);
                this.setState({ uploading: false });
            });
    }

    handleClearFiles() {
        this.setState({ files: [] });
    }

    handleDeleteFile(file) {
        if (!file) {
            return;
        }

        const files = this.state.files;
        const index = files.indexOf(file);

        if (index > -1) {
            files.splice(index, 1);
            this.setState({ files: files });
        }
    }
}
