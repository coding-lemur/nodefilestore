import React from 'react';

export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="progress">
                <div className="determinate" style={{ width: this.props.value + '%' }}></div>
            </div>
        );
    }
}

Progress.propTypes = {
    value: React.PropTypes.number.isRequired
};
