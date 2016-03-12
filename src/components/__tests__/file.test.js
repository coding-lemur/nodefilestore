import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import File from '../file';
import Progress from '../progress';
import FileViewModel from '../../viewmodels/file.viewmodel';

chai.should();

describe('file component', () => {
    describe('with normal file and without delete-button', () => {
        const noRefCheck = () => {};

        let file;
        let component;

        beforeEach(() => {
            file = new FileViewModel();
            file.name = 'test.jpg';
            file.size = 1024;
            file.mimeType = 'image/jpeg';
            file.date = new Date();

            component = shallow(<File file={file} onDeleteFile={noRefCheck} />);
        });

        it('should have base CSS classes', () => {
            component.is('li.collection-item.file').should.equal(true);
        });

        it('should show file name and size', () => {
            component.find('.file-name').text().should.equal('test.jpg');
            component.find('.file-size').text().should.equal('1.00 Kb');
        });

        it('shouldn\'t show delete button', () => {
            component.find('.remove-button').length.should.equal(0);
        });

        it('shouldn\'t show progressbar', () => {
            component.contains(<Progress value={file.uploadedPercentage} />).should.equal(false);
        });
    });

    describe('with normal file and delete button', () => {
        let file;
        let component;
        let onDeleteButtonClick;

        beforeEach(() => {
            file = new FileViewModel();
            file.name = 'test.jpg';
            file.size = 1024;
            file.mimeType = 'image/jpeg';
            file.date = new Date();

            onDeleteButtonClick = sinon.spy();

            component = shallow(<File file={file} showDeleteButton onDeleteFile={onDeleteButtonClick} />);
        });

        it('should have base CSS classes', () => {
            component.is('li.collection-item.file').should.equal(true);
        });

        it('should show file name and size', () => {
            component.find('.file-name').text().should.equal('test.jpg');
            component.find('.file-size').text().should.equal('1.00 Kb');
        });

        it('should show delete button', () => {
            component.find('.remove-button').length.should.equal(1);
        });

        it('shouldn\'t show progressbar', () => {
            component.contains(<Progress value={file.uploadedPercentage} />).should.equal(false);
        });

        it('should handle delete-button click event', () => {
            component.find('.remove-button').simulate('click');
            onDeleteButtonClick.calledWith(file).should.equal(true);
        });
    });

    describe('with uploading file and delete button', () => {
        let file;
        let component;

        const noRefCheck = () => {};

        beforeEach(() => {
            file = new FileViewModel();
            file.name = 'test.jpg';
            file.size = 1024;
            file.mimeType = 'image/jpeg';
            file.date = new Date();
            file.isUploading = true;
            file.uploadedPercentage = 17;

            component = shallow(<File file={file} showDeleteButton onDeleteFile={noRefCheck} />);
        });

        it('should have base CSS classes', () => {
            component.is('li.collection-item.file').should.equal(true);
        });

        it('should show file name and size', () => {
            component.find('.file-name').text().should.equal('test.jpg');
            component.find('.file-size').text().should.equal('1.00 Kb');
        });

        it('should show delete button', () => {
            component.find('.remove-button').length.should.equal(1);
        });

        it('should show progressbar with value', () => {
            component.contains(<Progress value={17} />).should.equal(true);
        });
    });
});
