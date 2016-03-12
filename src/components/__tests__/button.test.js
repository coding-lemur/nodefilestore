import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Button from '../button';

chai.should();

describe('button component', () => {
    describe('enabled', () => {
        let component;
        let onButtonClick;

        beforeEach(() => {
            onButtonClick = sinon.spy();

            component = shallow(<Button onClick={onButtonClick}>test button</Button>);
        });

        it('should have base CSS classes', () => {
            component.is('.waves-effect.waves-light.btn').should.equal(true);
        });

        it('should show child text', () => {
            component.text().should.equal('test button');
        });

        it('should handle click event', () => {
            component.simulate('click');
            onButtonClick.calledOnce.should.equal(true);
        });
    });

    describe('disabled', () => {
        let component;
        let onButtonClick;

        beforeEach(() => {
            onButtonClick = sinon.spy();

            component = shallow(<Button disabled onClick={onButtonClick}>test button</Button>);
        });

        it('should have base CSS classes', () => {
            component.is('.waves-effect.waves-light.btn').should.equal(true);
        });

        it('should have special CSS class for disabled state', () => {
            component.hasClass('disabled').should.equal(true);
        });

        it('should show child text', () => {
            component.text().should.equal('test button');
        });

        it('shouldn\'t handle click event', () => {
            component.simulate('click');
            onButtonClick.notCalled.should.equal(true);
        });
    });
});
