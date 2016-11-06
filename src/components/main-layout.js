import React from 'react';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-layout">
                <nav className="light-blue lighten-1">
                    <div className="nav-wrapper container">
                        <a className="brand-logo" id="logo-container" href="/">nodefilestore</a>
                    </div>
                </nav>
                <div id="content">
                    {React.cloneElement(this.props.children, this.props)}
                </div>
                <footer className="page-footer grey lighten-4">
                    <div className="container">nodefilestore 1.3.0</div>
                        <div className="footer-copyright">
                            <div className="container">
                                &copy; 2015 - {new Date().getFullYear()} by <a href="http://www.coding-lemur.de" target="_blank">coding lemur</a>
                            </div>
                        </div>
                </footer>
            </div>
        );
    }
}
