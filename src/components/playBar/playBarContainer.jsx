import { connectWithId } from 'react-jplayer-utils';
import PlayBarAnimation from './animation';

const mapStateToProps = (_imState, { id }) => ({
  smoothPlayBar: _imState.get('jPlayers').toJS()[id].smoothPlayBar,
  currentPercentAbsolute: _imState.get('jPlayers').toJS()[id].currentPercentAbsolute,
  currentPercentRelative: _imState.get('jPlayers').toJS()[id].currentPercentRelative,
});

export default connectWithId(mapStateToProps)(PlayBarAnimation);
