import { connectWithId } from 'react-jplayer-utils';

import Video from './video';

const mapStateToProps = (_imState, { id }) => ({
  require: _imState.get('jPlayers').toJS()[id].mediaSettings.video,
});

export default connectWithId(mapStateToProps)(Video);
