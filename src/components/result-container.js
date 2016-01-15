import React from 'react';

import dateFormat from 'dateformat';

export default class ResultContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {apiResult} = this.props;

        return (
            <div className="result-container">
                <p>download-url: <a href={apiResult.downloadUrl}>{apiResult.downloadUrl}</a></p>
                <p className="download-expires">expires on {dateFormat(apiResult.expirationDate)}</p>
            </div>
        );
    }
}