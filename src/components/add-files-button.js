import React from 'react';
import classnames from 'classnames';

import FileViewModel from '../viewmodels/file.viewmodel';

export default class AddFilesButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const btnClasses = classnames('btn-floating', 'btn-large', 'red', {
            'disabled': this.props.disabled
        });

        return (
            <div className="fixed-action-btn">
                <a className={btnClasses} onClick={this.handleButtonClick.bind(this)}>
                    <i className="large material-icons">add</i>
                </a>
                <input type="file" multiple style={{display: 'none'}}
                       ref={(ref) => this.filePicker = ref}
                       onChange={this.filesSelected.bind(this)} />
            </div>
        );
    }

    handleButtonClick(e) {
        e.preventDefault();

        if (this.props.disabled) {
            return;
        }

        // open file-picker
        this.filePicker.click();
    }

    filesSelected(e) {
        const files = this.filePicker.files;
        const fileViewModels = [];

        // transform to viewmodels
        for (let i = 0; i < files.length; i++) {
            fileViewModels.push(new FileViewModel(files[i]));
        }

        this.props.onFilesAdded(fileViewModels);

        // reset
        e.target.value = '';
    }
}
