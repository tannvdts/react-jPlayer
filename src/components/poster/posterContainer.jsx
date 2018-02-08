import { connectWithId } from 'react-jplayer-utils';

import Poster from './poster';

const mapStateToProps = (_imState, { id }) => ({
  src: _imState.get('jPlayers').toJS()[id].media.poster,
});

export default connectWithId(mapStateToProps)(Poster);
