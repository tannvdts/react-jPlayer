import { connectWithId } from 'react-jplayer-utils';
import { setMute } from '../../actions/actions';
import Mute from './mute';

const mapStateToProps = (_imState, { id }) => ({
  muted: _imState.get('jPlayers').toJS()[id].muted,
});

const mapDispatchToProps = {
  setMute,
};

export default connectWithId(mapStateToProps, mapDispatchToProps)(Mute);
