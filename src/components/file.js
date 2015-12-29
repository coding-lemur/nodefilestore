import React from 'react';

import Progress from './progress';
import FileSizeFormatter from '../helper/file-size-formatter';

export default class File extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="collection-item file">
                <div className="file-name">{ this.props.file.name }</div>
                <div className="file-size">{ FileSizeFormatter.humanize(this.props.file.size) }</div>
                <a className="remove-button">
                    <i className="material-icons">delete</i>
                </a>
                <Progress value={this.props.file.uploadedPercentage} />
            </li>
        );
    }
}