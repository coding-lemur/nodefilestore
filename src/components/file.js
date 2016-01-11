import React from 'react';

import Progress from './progress';
import FileSizeFormatter from '../helper/file-size-formatter';

export default class File extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var progressNode;

        if (this.props.file.isUploading) {
            progressNode = <Progress value={this.props.file.uploadedPercentage} />;
        }

        return (
            <li className="collection-item file">
                <div className="file-name">{ this.props.file.name }</div>
                <div className="file-size">{ FileSizeFormatter.humanize(this.props.file.size) }</div>
                <a className="remove-button" onClick={this.removeFile.bind(this)}>
                    <i className="material-icons">delete</i>
                </a>
                {progressNode}
            </li>
        );
    }

    removeFile() {
        this.props.onDeleteFile(this.props.file);
    }
}