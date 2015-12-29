import React from 'react';

export default class FilesActionArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="action-area">
                <a className="waves-effect waves-light btn"
                   onClick={this.props.onClearFiles}>clear</a>
                <a className="waves-effect waves-light btn"
                   onClick={this.props.onUploadFiles}>upload</a>
            </div>
        );
    }
}