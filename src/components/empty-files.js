import React from 'react';

export default class EmptyFiles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="empty-container">
                <div className="row center">
                    <h1 className="orange-text">nodefilestore</h1>
                </div>
                <div className="row center">
                    <h5 className="header col s12 light">
                        A lightweight filesharing service with nodejs and reactjs
                    </h5>
                </div>
                <div className="row">
                    <div className="col s12 m4">
                        <h2 className="center light-blue-text">
                            <i className="material-icons">code</i>
                        </h2>
                        <h5 className="center">open source</h5>
                        <p className="light">
                            We don't do any magic with your files. The whole project is open-source on <a href="https://github.com/MCeddy/nodefilestore" target="_blank">GitHub</a>.
                        </p>
                    </div>
                    <div className="col s12 m4">
                        <h2 className="center light-blue-text">
                            <i className="material-icons">perm_identity</i>
                        </h2>
                        <h5 className="center">anonymous</h5>
                        <p className="light">
                            You don't need to register. You can upload any files. We don't log any IP address or something else.
                        </p>
                    </div>
                    <div className="col s12 m4">
                        <h2 className="center light-blue-text">
                            <i className="material-icons">delete</i>
                        </h2>
                        <h5 className="center">tidy</h5>
                        <p className="light">
                            After 7 days your files will deleted automatically.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
