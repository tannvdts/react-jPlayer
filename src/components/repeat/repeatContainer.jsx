import { connectWithId } from 'react-jplayer-utils';
import { compose, withHandlers } from 'recompose';

import { setOption } from '../../actions/actions';
import Repeat from './repeat';

const mapStateToProps = (_imState, { id }) => ({
  loop: _imState.get('jPlayers').toJS()[id].loop,
});

const handlers = {
  loop: props => () => props.setOption(props.id, 'loop', !props.loop),
};

export default compose(
  connectWithId(mapStateToProps, {
    setOption,
  }),
  withHandlers(handlers),
)(Repeat);
