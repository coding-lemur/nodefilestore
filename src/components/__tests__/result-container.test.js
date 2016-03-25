import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import ResultContainer from '../result-container';

chai.should();

describe('result-container component', () => {
    let component;

    beforeEach(() => {
        const apiResult = {
            downloadUrl: 'http://www.coding-lemur.de/download/abcd',
            expirationDate: '2016-04-01T10:10:00'
        };
        component = shallow(<ResultContainer apiResult={apiResult} />);
    });

    it('should have base CSS classes', () => {
        component.is('.result-container').should.equal(true);
    });

    it('should contains a download link', () => {
        const downloadLink = component.find('.download-link');
        downloadLink.props().href.should.equal('http://www.coding-lemur.de/download/abcd');
        downloadLink.text().should.equal('http://www.coding-lemur.de/download/abcd');
    });

    it('should show formated expiring date', () => {
        component.find('.download-expires').text().should.equal('expires on April 1, 2016 10:10 AM');
    });
});
