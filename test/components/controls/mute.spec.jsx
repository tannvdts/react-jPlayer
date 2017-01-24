import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { customAttributeTests } from '../../common';
import Mute from '../../../src/components/controls/mute';
import { classes } from '../../../src/util/constants';

describe('<Mute />', () => {
  const component = (
    <Mute>
      <i className="fa fa-mute" />
    </Mute>
  );
  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(component);
    spy = expect.createSpy();
  });

  it('renders children', () => {
    expect(wrapper.children('.fa-mute').exists()).toBeTruthy();
  });

  it('calls handler on click', () => {
    wrapper.setProps({ onClick: spy });
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('has mute class', () => {
    expect(wrapper.hasClass(classes.MUTE)).toBeTruthy();
  });

  customAttributeTests(component);
});
