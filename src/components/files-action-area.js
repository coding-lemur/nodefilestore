import React from 'react';

import Button from './button';

export default class FilesActionArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="action-area">
                <Button onClick={this.props.uploadFiles.bind(null)} disabled={this.props.disabled}>upload</Button>
                <Button onClick={this.props.clearFiles.bind(null)} disabled={this.props.disabled}>clear</Button>
            </div>
        );
    }
}

FilesActionArea.propTypes = {
    disabled: React.PropTypes.bool
};
