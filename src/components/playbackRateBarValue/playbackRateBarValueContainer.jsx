import { connectWithId } from 'react-jplayer-utils';
import PlaybackRateBarValue from './playbackRateBarValue';

const mapStateToProps = (_imState, { id }) => ({
  verticalPlaybackRate: _imState.get('jPlayers').toJS()[id].verticalPlaybackRate,
  minPlaybackRate: _imState.get('jPlayers').toJS()[id].minPlaybackRate,
  maxPlaybackRate: _imState.get('jPlayers').toJS()[id].maxPlaybackRate,
  playbackRate: _imState.get('jPlayers').toJS()[id].playbackRate,
});

export default connectWithId(mapStateToProps)(PlaybackRateBarValue);
