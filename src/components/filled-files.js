import React from 'react';

import FilesList from './files-list';
import FilesActionArea from './files-action-area';

export default class FilledFiles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="filled-files">
                <FilesList files={this.props.files} />
                <FilesActionArea onClearFiles={this.props.onClearFiles}
                                 onUploadFiles={this.props.onUploadFiles} />
            </div>
        )
    }
}