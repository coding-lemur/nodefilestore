import React from 'react';

import Dropzone from 'react-dropzone';
import AddFilesButton from './add-files-button';
import EmptyFiles from './empty-files';
import FilesList from './files-list';
import FilesActionArea from './files-action-area';
import ResultContainer from './result-container';
// import DataService from '../helper/data-service';
import FileViewModel from '../viewmodels/file.viewmodel';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let filesNode;
        let resultContainerNode;
        let filesActionAreaNode;

        if (false) { // has files this.state.files.length > 0
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
            <Dropzone disableClick
                      className="drop-zone"
                      activeClassName="drag-over"
                      rejectClassName="drop-rejected"
                      onDrop={this.onDrop.bind(this)}>
                <div className="upload-form container">
                    {filesNode}
                    {resultContainerNode}
                    {filesActionAreaNode}
                    <AddFilesButton disabled={false}
                                    onFilesAdded={this.handleFilesAdded.bind(this)} />
                </div>
            </Dropzone>
        );
    }

    handleFilesAdded(files) {
        /*
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
        */
    }

    handleFilesUpload() {
        /*
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
        */
    }

    handleClearFiles() {
        //this.setState({ files: [] });
    }

    handleDeleteFile(file) {
        /*
        if (!file) {
            return;
        }

        const files = this.state.files;
        const index = files.indexOf(file);

        if (index > -1) {
            files.splice(index, 1);
            this.setState({ files: files });
        }
        */
    }

    onDrop(files) {
        this.handleFilesAdded(files.map(file => {
            return new FileViewModel(file);
        }));
    }
}
