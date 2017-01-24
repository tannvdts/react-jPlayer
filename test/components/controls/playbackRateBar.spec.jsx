import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { customAttributeTests } from '../../common';
import PlaybackRateBar from '../../../src/components/controls/playbackRateBar';
import PlaybackRateBarValue from '../../../src/components/controls/playbackRateBarValue';
import { classes } from '../../../src/util/constants';

describe('<PlaybackRateBar />', () => {
  const component = <PlaybackRateBar />;

  let wrapper;
  let spy;

  beforeEach(() => {
    wrapper = shallow(component);
    spy = expect.createSpy();
  });

  it('renders children', () => {
    expect(wrapper.children(PlaybackRateBarValue).exists()).toBeTruthy();
  });

  it('calls handler on click', () => {
    wrapper.setProps({ onClick: spy });
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('calls handler on mouse down', () => {
    wrapper.setProps({ onMouseDown: spy });
    wrapper.simulate('mousedown');
    expect(spy).toHaveBeenCalled();
  });

  it('has playbackRateBar class', () => {
    expect(wrapper.hasClass(classes.PLAYBACK_RATE_BAR)).toBeTruthy();
  });

  customAttributeTests(component);
});
