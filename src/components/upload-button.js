import React from 'react';

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red" onClick={this.openFilePicker}>
                    <i className="large material-icons">add</i>
                </a>
                <input id="file-picker" type="file" multiple style={{display: 'none'}} onChange={this.filesSelected} />
            </div>
        )
    }

    openFilePicker(e) {
        e.preventDefault();

        var filePicker = document.getElementById('file-picker');
        filePicker.click();
    }

    filesSelected(e) {
        e.target.value = '';
    }
}