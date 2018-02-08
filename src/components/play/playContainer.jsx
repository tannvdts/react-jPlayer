import { connectWithId } from 'react-jplayer-utils';

import { play, pause } from '../../actions/actions';
import Play from './play';

const mapStateToProps = (_imState, { id }) => ({
  paused: _imState.get('jPlayers').toJS()[id].paused,
});

const mapDispatchToProps = dispatch => ({
  play: (id, paused) => {
    if (paused) {
      dispatch(play(id));
    } else {
      dispatch(pause(id));
    }
  },
});

export default connectWithId(mapStateToProps, mapDispatchToProps)(Play);
