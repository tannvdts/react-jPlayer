import { connectWithId } from 'react-jplayer-utils';

import BrowserUnsupported from './browserUnsupported';

const mapStateToProps = (_imState, { id }) => ({
  nonSupported: _imState.get('jPlayers').toJS()[id].mediaSettings.nonSupported,
});

export default connectWithId(mapStateToProps)(BrowserUnsupported);
