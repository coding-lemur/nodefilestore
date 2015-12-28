import React from 'react';

export default class EmptyFiles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="empty-container">
                <p><i>nodefilestore</i> is an easy filesharing service.</p>
                <p>You can anonymously upload files and you get a secret download link for sharing with your friend.</p>
                <p>After 7 days, the link is invalid, and the files are deleted.</p>
            </div>
        )
    }
}