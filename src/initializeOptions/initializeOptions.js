import { fromJS } from 'immutable';

import { defaultStatus, defaultOptions } from '../util/constants';

let initialState = fromJS({});
export const getInitialState = () => initialState;

const options = (jPlayerOptions) => {
  initialState = initialState.merge(defaultStatus).merge(defaultOptions).merge(jPlayerOptions);
};

export default options;
