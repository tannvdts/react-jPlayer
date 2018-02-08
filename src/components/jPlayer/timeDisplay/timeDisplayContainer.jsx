import { connectWithId, convertTime } from 'react-jplayer-utils';
import { compose, lifecycle as setLifecycle, withHandlers, renderNothing } from 'recompose';

import { setOption } from '../../../actions/actions';

const mapStateToProps = (_imState, { id }) => ({
  timeFormats: _imState.get('jPlayers').toJS()[id].timeFormats,
  currentTime: _imState.get('jPlayers').toJS()[id].currentTime,
  duration: _imState.get('jPlayers').toJS()[id].duration,
  showRemainingDuration: _imState.get('jPlayers').toJS()[id].showRemainingDuration,
});

const handlers = {
  setDurationText: props => () => {
    let durationText = '';

    if (props.showRemainingDuration) {
      const timeRemaining = props.duration - props.currentTime;

      durationText = (timeRemaining > 0 ? '-' : '') +
        convertTime(timeRemaining, props.timeFormats);
    } else {
      durationText = convertTime(props.duration, props.timeFormats);
    }

    props.setOption(props.id, 'durationText', durationText);
  },
  setCurrentTimeText: props => () => {
    const currentTimeText = convertTime(props.currentTime, props.timeFormats);

    props.setOption(props.id, 'currentTimeText', currentTimeText);
  },
};

const lifecycle = {
  componentDidUpdate(prevProps) {
    if (prevProps.timeFormats !== this.props.timeFormats ||
      prevProps.currentTime !== this.props.currentTime) {
      this.props.setCurrentTimeText();
    }

    if (prevProps.timeFormats !== this.props.timeFormats ||
      prevProps.currentTime !== this.props.currentTime ||
      prevProps.duration !== this.props.duration ||
      prevProps.showRemainingDuration !== this.props.showRemainingDuration) {
      this.props.setDurationText();
    }
  },
};

export default compose(
  connectWithId(mapStateToProps, {
    setOption,
  }),
  withHandlers(handlers),
  setLifecycle(lifecycle),
)(renderNothing(null));

