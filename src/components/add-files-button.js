import React from 'react';

import FileViewModel from '../viewmodels/file.viewmodel';

export default class AddFilesButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red" onClick={this.openFilePicker.bind(this)}>
                    <i className="large material-icons">add</i>
                </a>
                <input id="file-picker" type="file" multiple style={{display: 'none'}} onChange={this.filesSelected.bind(this)} />
            </div>
        )
    }

    openFilePicker(e) {
        e.preventDefault();

        var filePicker = document.getElementById('file-picker');
        filePicker.click();
    };

    filesSelected(e) {
        var filePicker = document.getElementById('file-picker');
        var files = filePicker.files;
        var fileViewModels = [];

        // transform to viewmodels
        for (var i = 0; i < files.length; i++) {
            fileViewModels.push(new FileViewModel(files[i]));
        }

        this.props.onFilesAdded(fileViewModels);

        // reset
        e.target.value = '';
    };
}