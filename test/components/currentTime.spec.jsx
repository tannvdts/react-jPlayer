import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { customAttributeTests } from '../common';
import CurrentTime from '../../src/components/currentTime';
import { classes } from '../../src/util/constants';

describe('<CurrentTime />', () => {
  const component = (
    <CurrentTime>
      <div className="current-time">0:00</div>
    </CurrentTime>
  );
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(component);
  });

  it('renders children', () => {
    expect(wrapper.children('.current-time').exists()).toBeTruthy();
  });

  it('has currentTime class', () => {
    expect(wrapper.hasClass(classes.CURRENT_TIME)).toBeTruthy();
  });

  customAttributeTests(component);
});
