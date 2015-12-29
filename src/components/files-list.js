import React from 'react';

import File from './file';

export default class FilesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let i = 0;
        var fileNodes = this.props.files.map((file) => {
            return (
                <File file={file} key={i++} />
            );
        });

        return (
            <ul className="file-list collection">
                {fileNodes}
            </ul>
        )
    }
}