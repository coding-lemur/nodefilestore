import React from 'react';

import File from './file';
import FileViewModel from '../viewmodels/file.viewmodel';

export default class FilesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="file-list collection">
                {this.props.files.map((file, index) => (
                    <File {...this.props} key={index} file={file} showDeleteButton={this.props.showDeleteButtons} />
                ))}
            </ul>
        );
    }
}

FilesList.propTypes = {
    files: React.PropTypes.arrayOf(React.PropTypes.instanceOf(FileViewModel)).isRequired,
    showDeleteButtons: React.PropTypes.bool
};
