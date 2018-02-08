import { connectWithId } from 'react-jplayer-utils';

import Audio from './audio';

const mapStateToProps = (_imState, { id }) => ({
  require: !_imState.get('jPlayers').toJS()[id].mediaSettings.video,
});

export default connectWithId(mapStateToProps)(Audio);
