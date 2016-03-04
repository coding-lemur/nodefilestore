import React from 'react';
import classnames from 'classnames';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const btnClasses = classnames('waves-effect', 'waves-light', 'btn', {
            'disabled': this.props.disabled
        });

        return (
            <a className={btnClasses} onClick={this.handleClick.bind(this)}>{this.props.children}</a>
        );
    }

    handleClick(e) {
        e.preventDefault();

        if (this.props.disabled) {
            return;
        }

        this.props.onClick();
    }
}

Button.propTypes = {
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired
};
