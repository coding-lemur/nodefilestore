import React from 'react';

import EmptyFiles from './empty-files';
import FilledFiles from './filled-files';
import UploadButton from './upload-button';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    render() {
        var node;

        if (this.state.files.length === 0) {
            node = <EmptyFiles />;
        }
        else {
            node = <FilledFiles />;
        }

        return (
            <div className="upload-form">
                {node}
                <UploadButton />
            </div>
        );
    }
}