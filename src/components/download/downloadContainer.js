import { connectWithId } from 'react-jplayer-utils';

import Download from './download';

const mapStateToProps = (_imState, { id }) => ({
  free: _imState.get('jPlayers').toJS()[id].media.free,
  url: _imState.get('jPlayers').toJS()[id].src,
});

export default connectWithId(mapStateToProps)(Download);
