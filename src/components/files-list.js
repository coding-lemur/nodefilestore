import React from 'react';

import File from './file';

export default class FilesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="file-list collection">
                {this.props.files.map((file, index) => (
                    <File file={file}
                          showDeleteButton={this.props.showDeleteButtons}
                          key={index}
                          onDeleteFile={this.props.onDeleteFile} />
                ))}
            </ul>
        )
    }
}