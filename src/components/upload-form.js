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
    render() {
        let filesNode;
        let resultContainerNode;
        let filesActionAreaNode;

        const handleFilesUpload = () => {
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
        };

        if (this.props.files.length > 0) { // has files
            filesNode = (
                <FilesList {...this.props} showDeleteButtons={true} />
                // !(this.state.uploading || this.state.uploadFinished)
            );
            /*
             if (this.state.uploadFinished) {
             resultContainerNode = (
             <ResultContainer apiResult={this.state.apiResult} />
             );
             }
             else { // upload not finished

             }
             */
            filesActionAreaNode = (
                <FilesActionArea {...this.props} disabled={false} /> // this.state.uploading
            );
        }
        else { // hasn't files
            filesNode = <EmptyFiles />;
        }

        return (
            <Dropzone disableClick
                      className="drop-zone"
                      activeClassName="drag-over"
                      rejectClassName="drop-rejected"
                      onDrop={(files) => this.props.addFiles(files.map((file) => new FileViewModel(file)))}>
                <div className="upload-form container">
                    {filesNode}
                    {resultContainerNode}
                    {filesActionAreaNode}
                    <AddFilesButton {...this.props} disabled={false} />
                </div>
            </Dropzone>
        );
    }
}
