import { limitValue } from 'react-jplayer-utils';
import { fromJS } from 'immutable';

import { getInitialState } from '../initializeOptions/initializeOptions';
import { actionNames, formats as supportedFormats, defaultStatus, defaultOptions } from '../util/constants';
import urlNotSetError from '../util/errorHandlers/urlNotSetError';
import noFormatSupportedError from '../util/errorHandlers/noFormatSupportedError';


const updateFormats = (sources) => {
  const formats = [];

  Object.keys(sources).forEach((supplied) => {
    let canPlayType;

    try {
      // Some legacy browsers don't have canPlayType property
      canPlayType = document.createElement(supportedFormats[supplied].MEDIA)
        .canPlayType(supportedFormats[supplied].CODEC);
    } catch (error) {
      canPlayType = '';
    }

    formats.push({
      supplied,
      supported: canPlayType,
    });
  });

  return formats;
};

const clearMedia = () => (fromJS({
  ...defaultStatus,
  media: defaultOptions.media,
}));

const setMedia = (_, { media }) => {
  let video;
  let src;
  let nonSupported = true;
  let error;

  const formats = updateFormats(media.sources);

  formats.forEach((format) => {
    if (format.supported && nonSupported) {
      video = supportedFormats[format.supplied].MEDIA === 'video';
      src = media.sources[format.supplied];
      nonSupported = false;
    }
  });

  if (nonSupported) {
    error = noFormatSupportedError(
      `media.sources: '${Object.keys(media.sources).join(', ')}'`,
    );
  }

  return fromJS({
    ...clearMedia(),
    mediaSettings: {
      formats,
      video,
      nonSupported,
    },
    media,
    video,
    src,
    paused: true,
    error,
  });
};

const play = (jPlayer, { time }) => {
  if (jPlayer.src) {
    return fromJS({
      paused: false,
      newTime: !isNaN(time) ? time : null,
    });
  }

  return fromJS({
    error: urlNotSetError(play.name),
  });
};

const pause = (jPlayer, { time }) => {
  if (jPlayer.src) {
    return fromJS({
      paused: true,
      newTime: !isNaN(time) ? time : null,
    });
  }

  return fromJS({
    error: urlNotSetError(pause.name),
  });
};

const setPlayHead = (jPlayer, { percent }) => {
  const limitedPercent = limitValue(percent, 0, 100);

  if (jPlayer.src) {
    return fromJS({
      playHeadPercent: limitedPercent,
    });
  }

  return fromJS({
    error: urlNotSetError(setPlayHead.name),
  });
};

const setVolume = (_, { volume }) => (fromJS({
  volume: limitValue(volume, 0, 1),
  muted: volume <= 0,
}));

const setMute = (_, { mute }) => (fromJS({
  muted: mute,
}));

const setOption = (jPlayer, { key, value }) => {
  switch (key) {
    case 'media': {
      if (Object.keys(value).some(v => v)) {
        return setMedia(jPlayer, { media: value });
      }
      return clearMedia();
    }
    case 'playHeadPercent':
      return setPlayHead(jPlayer, { percent: value });
    case 'volume':
      return setVolume(jPlayer, { volume: value });
    case 'muted':
      return setMute(jPlayer, { mute: value });
    default:
      return fromJS({
        [key]: value,
      });
  }
};

const focus = (state, id) => {
  const newState = state.toJS();

  if (newState[id].keyEnabled) {
    Object.keys(newState).forEach((key) => {
      if (key === id) {
        newState[key].focused = true;
      } else {
        newState[key].focused = false;
      }
    });
  }

  return fromJS(newState);
};

const focusOnFirstKeyEnabledPlayer = (state) => {
  const newState = state.toJS();
  const firstKeyEnabledPlayer = Object.keys(newState).filter(key =>
    newState[key].keyEnabled,
  ).shift();

  if (newState[firstKeyEnabledPlayer] !== undefined) {
    const focusedPlayer = {
      ...newState[firstKeyEnabledPlayer],
      focused: true,
    };

    return fromJS({
      ...newState,
      [firstKeyEnabledPlayer]: focusedPlayer,
    });
  }

  return fromJS(newState);
};

const updateJPlayer = (stateIm, action, fn) => {
  const state = stateIm.toJS();
  const value = fn(state[action.id], action);
  const newState = state[action.id].keyEnabled ? focus(state, action.id) :
    focusOnFirstKeyEnabledPlayer(state);
  const jPlayer = newState[action.id];

  return fromJS({
    ...newState,
    [action.id]: {
      ...jPlayer,
      ...value,
    },
  });
};

const reducer = (state = getInitialState(), action) => {
  const updateValue = fn => updateJPlayer(state, action, fn);

  switch (action.type) {
    case actionNames.SET_MEDIA:
      return updateValue(setMedia);
    case actionNames.CLEAR_MEDIA:
      return updateValue(clearMedia);
    case actionNames.PLAY:
      return updateValue(play);
    case actionNames.PAUSE:
      return updateValue(pause);
    case actionNames.PLAY_HEAD:
      return updateValue(setPlayHead);
    case actionNames.VOLUME:
      return updateValue(setVolume);
    case actionNames.MUTE:
      return updateValue(setMute);
    case actionNames.SET_OPTION:
      return updateValue(setOption);
    case actionNames.FOCUS:
      return focus(state, action.id);
    default:
      return state;
  }
};

export default reducer;
