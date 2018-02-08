import { lifecycle as setLifecycle, withHandlers, compose } from 'recompose';
import { connectWithId } from 'react-jplayer-utils';

import { setOption } from '../../actions/actions';
import GuiAnimation from './animation';

const timeoutIds = [];

const mapStateToProps = (_imState, { id }) => ({
  fullScreen: _imState.get('jPlayers').toJS()[id].fullScreen,
  paused: _imState.get('jPlayers').toJS()[id].paused,
  startGuiFadeOut: _imState.get('jPlayers').toJS()[id].startGuiFadeOut,
  guiFadeOut: _imState.get('jPlayers').toJS()[id].guiFadeOut,
  guiFadeHoldTime: _imState.get('jPlayers').toJS()[id].guiFadeHoldTime,
});

const handlers = {
  onMouseMove: props => () => {
    if (props.fullScreen) {
      props.setOption(props.id, 'startGuiFadeOut', false);

      timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    }
  },
  fadeOutHandler: props => () => {
    props.setOption(props.id, 'guiFadeOut', true);
  },
};

const lifecycle = {
  startFade() {
    if (this.props.fullScreen && !this.props.paused && this.props.startGuiFadeOut) {
      timeoutIds.push(setTimeout(this.props.fadeOutHandler, this.props.guiFadeHoldTime));
    } else if (!this.props.startGuiFadeOut) {
      this.props.setOption(this.props.id, 'guiFadeOut', false);
    }
  },
  componentDidUpdate(prevProps) {
    if (prevProps.startGuiFadeOut !== this.props.startGuiFadeOut) {
      this.startFade();
    }
  },
};

export default compose(
  connectWithId(mapStateToProps, {
    setOption,
  }),
  withHandlers(handlers),
  setLifecycle(lifecycle),
)(GuiAnimation);
