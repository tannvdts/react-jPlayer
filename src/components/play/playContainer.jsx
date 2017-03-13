import { play, pause } from '../../actions/actions';
import { connectWithId } from '../../util/index';
import Play from './play';

const mapStateToProps = ({ jPlayers }, { id }) => ({
  paused: jPlayers[id].paused,
});

const mergeProps = ({ paused }, { dispatch }, { id, ...attributes }) => ({
  onClick: () => (paused ? dispatch(play(undefined, id))
    : dispatch(pause(undefined, id))),
  ...attributes,
});

export default connectWithId(mapStateToProps, null, mergeProps)(Play);