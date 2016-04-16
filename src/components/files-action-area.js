import React from 'react';

import Button from './button';

export default class FilesActionArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="action-area">
                <Button onClick={this.props.onUploadFiles} disabled={this.props.disabled}>upload</Button>
                <Button onClick={this.props.onClearFiles} disabled={this.props.disabled}>clear</Button>
            </div>
        );
    }
}

FilesActionArea.propTypes = {
    disabled: React.PropTypes.bool,
    onClearFiles: React.PropTypes.func.isRequired,
    onUploadFiles: React.PropTypes.func.isRequired
};
