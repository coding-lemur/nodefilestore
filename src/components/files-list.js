import React from 'react';

import File from './file';

export default class FilesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var fileNodes = this.props.files.map((file) => {
            return (
                <li className="collection-item file">
                    <File file={file} />
                </li>
            );
        });

        return (
            <ul className="file-list collection">
                {fileNodes}
            </ul>
        )
    }
}