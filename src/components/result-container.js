import React from 'react';
import moment from 'moment';

export default class ResultContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {apiResult} = this.props;

        return (
            <div className="result-container">
                <p>download-url: <a className="download-link" href={apiResult.downloadUrl}>{apiResult.downloadUrl}</a></p>
                <p className="download-expires">expires on {moment(apiResult.expirationDate).format('LLL')}</p>
            </div>
        );
    }
}

ResultContainer.propTypes = {
    apiResult: React.PropTypes.shape({
        downloadUrl: React.PropTypes.string.isRequired,
        expirationDate: React.PropTypes.string.isRequired
    }).isRequired
};
