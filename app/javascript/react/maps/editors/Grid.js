import React, { Component } from 'react'
import Tooltip from '../../common/Tooltip'
import ColorPicker from '../../common/ColorPicker'

import { connect } from 'react-redux'
import {
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize,
  gridUpdate
} from '../../redux/modules/maps'

import { mapConfig } from '../../../game/models/TileMap'

class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alpha: this.props.alpha,
      color: this.props.color,
      tileSize: this.props.tileSize
    }

    this.setAlpha = this.setAlpha.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setTileSize = this.setTileSize.bind(this)
  }

  setAlpha(event) {
    let newAlpha = event.target.value
    this.setState({ alpha: newAlpha })

    // if value is valid, dispatch to redux store
    if (newAlpha && newAlpha >= 0 && newAlpha <= 100) {
      this.props.gridSetAlpha(parseInt(newAlpha))
    }
  }

  setColor(newColor, event) {
    this.setState({ color: newColor })

    if (newColor.match( /^#(?:[0-9a-fA-F]{3}){1,2}$/ )) {
      this.props.gridSetColor(newColor)
    }
  }

  setTileSize(event) {
    let newTileSize = event.target.value
    this.setState({ tileSize: newTileSize })

    if (newTileSize &&
        newTileSize >= mapConfig.minimum.tileSize &&
        newTileSize <= mapConfig.maximum.tileSize) {
      this.props.gridSetTileSize(parseInt(newTileSize))
    }
  }

  render() {
    return(
      <div>
        <h5>
          Grid Options
          <Tooltip
            body="Edit how the grid displays on the map."
            />
        </h5>
        <div className="columns small-6 medium-4">
          <label>
            Color
            <ColorPicker initialColor={this.state.color}
              onChange={this.setColor} />
          </label>
        </div>
        <div className="columns small-6 medium-4">
          <label>
            Opacity (%)
            <input type="number"
              id="grid-alpha" name="grid-alpha"
              min="0" max="100"
              value={this.state.alpha}
              onChange={this.setAlpha}
              />
          </label>
        </div>
        <div className="columns small-6 medium-4">
          <label>
            Tile size (px)
            <p>
              {mapConfig.minimum.tileSize}px - {mapConfig.maximum.tileSize}px
            </p>
            <input type="number"
              id="grid-size" name="grid-size"
              min={mapConfig.minimum.tileSize} max={mapConfig.maximum.tileSize}
              value={this.state.tileSize}
              onChange={this.setTileSize}
              />
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    alpha: state.maps.grid.alpha,
    color: state.maps.grid.color,
    tileSize: state.maps.grid.tileSize
  }
}

const mapDispatchToProps = {
  gridSetAlpha,
  gridSetColor,
  gridSetTileSize
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid)
