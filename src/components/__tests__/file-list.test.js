import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import FileList from '../files-list';
import File from '../file';
import FileViewModel from '../../viewmodels/file.viewmodel';

chai.should();

describe('file-list component', () => {
    let component;

    beforeEach(() => {
        const file1 = new FileViewModel();
        file1.name = 'test.jpg';
        file1.size = 1024;
        file1.mimeType = 'image/jpeg';
        file1.date = new Date();

        const file2 = new FileViewModel();
        file1.name = 'video.mp4';
        file1.size = 266922;
        file1.mimeType = 'video/mp4';
        file1.date = new Date();

        const file3 = new FileViewModel();
        file1.name = 'readme.docx';
        file1.size = 7025;
        file1.mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        file1.date = new Date();

        const files = [file1, file2, file3];

        const noRefCheck = () => {};

        component = shallow(<FileList files={files} onDeleteFile={noRefCheck} />);
    });

    it('should have base CSS classes', () => {
        component.is('.file-list.collection').should.equal(true);
    });

    it('should contains four file components', () => {
        component.find(File).length.should.equal(3);
    });
});
