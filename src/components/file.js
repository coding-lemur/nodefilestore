import React from 'react';

import Progress from './progress';
import FileSizeFormatter from '../helper/file-size-formatter';

export default class File extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {file} = this.props;

        var progressNode;
        if (file.isUploading) {
            progressNode = <Progress value={file.uploadedPercentage} />;
        }

        var deleteButtonNode;
        if (this.props.showDeleteButton) {
            deleteButtonNode = (
                <a className="remove-button" onClick={this.removeFile.bind(this)}>
                    <i className="material-icons">delete</i>
                </a>
            );
        }

        return (
            <li className="collection-item file">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{FileSizeFormatter.humanize(file.size)}</div>
                {deleteButtonNode}
                {progressNode}
            </li>
        );
    }

    removeFile() {
        this.props.onDeleteFile(this.props.file);
    }
}