import React from 'react';

import Progress from './progress';
import FileSizeFormatter from '../helper/file-size-formatter';
import FileViewModel from '../viewmodels/file.viewmodel';

export default class File extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {file} = this.props;

        let progressNode;
        if (file.isUploading) {
            progressNode = <Progress value={file.uploadedPercentage} />;
        }

        let deleteButtonNode;
        if (this.props.showDeleteButton) {
            deleteButtonNode = (
                <a className="remove-button" onClick={this.props.deleteFile.bind(null, file)}>
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
}

File.propTypes = {
    file: React.PropTypes.instanceOf(FileViewModel).isRequired,
    showDeleteButton: React.PropTypes.bool
};
