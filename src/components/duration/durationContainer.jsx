import { connectWithId } from 'react-jplayer-utils';

import Duration from './duration';

const mapStateToProps = (_imState, { id }) => ({
  durationText: _imState.get('jPlayers').toJS()[id].durationText,
});

export default connectWithId(mapStateToProps)(Duration);
