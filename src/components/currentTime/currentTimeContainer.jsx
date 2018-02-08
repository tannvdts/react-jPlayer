import { connectWithId } from 'react-jplayer-utils';

import CurrentTime from './currentTime';

const mapStateToProps = (_imState, { id }) => ({
  currentTimeText: _imState.get('jPlayers').toJS()[id].currentTimeText,
});

export default connectWithId(mapStateToProps)(CurrentTime);
