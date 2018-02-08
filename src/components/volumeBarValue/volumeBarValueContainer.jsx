import { connectWithId } from 'react-jplayer-utils';
import VolumeBarValue from './volumeBarValue';

const mapStateToProps = (_imState, { id }) => ({
  verticalVolume: _imState.get('jPlayers').toJS()[id].verticalVolume,
  muted: _imState.get('jPlayers').toJS()[id].muted,
  volume: _imState.get('jPlayers').toJS()[id].volume,
});

export default connectWithId(mapStateToProps)(VolumeBarValue);
