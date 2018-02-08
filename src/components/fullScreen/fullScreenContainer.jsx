import { connectWithId } from 'react-jplayer-utils';

import { setOption } from '../../actions/actions';
import FullScreen from './fullScreen';

const mapStateToProps = (_imState, { id }) => ({
  fullScreen: _imState.get('jPlayers').toJS()[id].fullScreen,
});

const mapDispatchToProps = {
  setFullScreen: (id, fullScreen) => setOption(id, 'fullScreen', fullScreen),
};

export default connectWithId(mapStateToProps, mapDispatchToProps)(FullScreen);
