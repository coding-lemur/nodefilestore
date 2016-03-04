import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import File from '../file';
import Progress from '../progress';
import FileViewModel from '../../viewmodels/file.viewmodel';

const noRefCheck = () => {};

describe('file component', () => {
    it('should render file', () => {
        const file = new FileViewModel();
        file.name = 'test.jpg';
        file.size = 1024;
        file.mimeType = 'image/jpeg';
        file.date = new Date();

        const renderer = TestUtils.createRenderer();
        renderer.render(<File file={file} onDeleteFile={noRefCheck} />);

        const actualElement = renderer.getRenderOutput();
        const expectedElement = (<li className="collection-item file">
            <div className="file-name">test.jpg</div>
            <div className="file-size">1.00 Kb</div>
        </li>);
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('should render file and delete button', () => {
        const file = new FileViewModel();
        file.name = 'test.jpg';
        file.size = 1024;
        file.mimeType = 'image/jpeg';
        file.date = new Date();

        const renderer = TestUtils.createRenderer();
        renderer.render(<File file={file} showDeleteButton onDeleteFile={noRefCheck} />);

        const actualElement = renderer.getRenderOutput();
        const expectedElement = (<li className="collection-item file">
            <div className="file-name">test.jpg</div>
            <div className="file-size">1.00 Kb</div>
            <a className="remove-button" onClick={noRefCheck}>
                <i className="material-icons">delete</i>
            </a>
        </li>);
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('should render file with progress bar while uploading', () => {
        const file = new FileViewModel();
        file.name = 'test.jpg';
        file.size = 1024;
        file.mimeType = 'image/jpeg';
        file.date = new Date();
        file.isUploading = true;
        file.uploadedPercentage = 17;

        const renderer = TestUtils.createRenderer();
        renderer.render(<File file={file} onDeleteFile={noRefCheck} />);

        const actualElement = renderer.getRenderOutput();
        const expectedElement = (<li className="collection-item file">
            <div className="file-name">test.jpg</div>
            <div className="file-size">1.00 Kb</div>
            <Progress value={17} />
        </li>);
        expect(actualElement).toEqualJSX(expectedElement);
    });
});
