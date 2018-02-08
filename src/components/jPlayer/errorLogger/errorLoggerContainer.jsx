/* eslint-disable no-console */
import { connectWithId } from 'react-jplayer-utils';
import { compose, lifecycle, renderNothing } from 'recompose';

const mapStateToProps = (_imState, { id }) => ({
  error: _imState.get('jPlayers').toJS()[id].error,
});

const lifecycleFunctions = {
  logError() {
    console.error(this.props.error);
  },
  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      this.logError();
    }
  },
};

export default compose(
  connectWithId(mapStateToProps),
  lifecycle(lifecycleFunctions),
)(renderNothing(null));
