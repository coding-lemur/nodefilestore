import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import Progress from '../progress';

chai.should();

describe('progress component', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Progress value={42} />);
    });

    it('should have base CSS classes', () => {
        component.is('.progress').should.equal(true);
    });

    it('should show value', () => {
        component.find('.determinate').props().style.width.should.equal('42%');
    });
});
