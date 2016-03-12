import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import EmptyFiles from '../empty-files';

chai.should();

describe('empty-files component', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EmptyFiles />);
    });

    it('should have base CSS classes', () => {
        component.is('.empty-container').should.equal(true);
    });
});
