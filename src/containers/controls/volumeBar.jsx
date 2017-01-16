import React from 'react';

import { connectWithId, getWidth, getHeight, getOffset } from '../../util/index';
import { defaultOptions } from '../../util/constants';
import { setVolume } from '../../actions/jPlayerActions';
import VolumeBar from '../../components/controls/volumeBar';
import VolumeBarValue from '../../components/controls/volumeBarValue';

const mapStateToProps = ({ jPlayers }, { id, children, ...attributes }) => ({
  verticalVolume: jPlayers[id].verticalVolume,
  barDrag: jPlayers[id].barDrag,
  children,
  attributes,
});

const mergeProps = (stateProps, { dispatch }, { id }) => ({
  setVolume: newVolume => dispatch(setVolume(newVolume, id)),
  ...stateProps,
});

class VolumeBarContainer extends React.Component {
  static get propTypes() {
    return {
      attributes: React.PropTypes.objectOf(React.PropTypes.node),
      setVolume: React.PropTypes.func.isRequired,
      verticalVolume: React.PropTypes.bool,
      barDrag: React.PropTypes.bool,
      children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element,
      ]),
    };
  }
  static get defaultProps() {
    return {
      attributes: {},
      verticalVolume: defaultOptions.verticalVolume,
      barDrag: defaultOptions.barDrag,
      children: (<VolumeBarValue />),
    };
  }
  componentWillMount() {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  }
  onClick = e => this.moveVolumeBar(e)
  onMouseMove = e => (this.props.barDrag && this.dragging ? this.moveVolumeBar(e) : null)
  onMouseDown = () => (this.dragging = true)
  onMouseUp = () => (this.dragging = false)
  setVolumeBar = ref => (this.volumeBar = ref)
  moveVolumeBar = (e) => {
    const offset = getOffset(this.volumeBar);
    const x = e.pageX - offset.left;
    const w = getWidth(this.volumeBar);
    const y = (getHeight(this.volumeBar) - e.pageY) + offset.top;
    const h = getHeight(this.volumeBar);

    if (this.props.verticalVolume) {
      this.props.setVolume(y / h);
    } else {
      this.props.setVolume(x / w);
    }
  }
  componentWillUnMount() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }
  render() {
    return (
      <VolumeBar
        {...this.props.attributes} setVolumeBar={this.setVolumeBar}
        onClick={this.onClick} onMouseDown={this.onMouseDown}
      >
        {this.props.children}
      </VolumeBar>
    );
  }
}

export default connectWithId(mapStateToProps, null, mergeProps)(VolumeBarContainer);