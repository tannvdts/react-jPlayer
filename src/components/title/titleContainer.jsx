import { connectWithId, formatArtistAndTitle } from 'react-jplayer-utils';

import Title from './title';

const mapStateToProps = (_imState, { id }) => ({
  title: formatArtistAndTitle(_imState.get('jPlayers').toJS()[id].media.artist, _imState.get('jPlayers').toJS()[id].media.title),
});

export default connectWithId(mapStateToProps)(Title);
