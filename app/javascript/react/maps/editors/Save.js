import React from 'react'
import FetchingComponent from '../../lib/FetchingComponent'
import Tooltip from '../../common/Tooltip'

import { connect } from 'react-redux'
import { editMapName, upload } from '../../redux/modules/maps'

import { fetchPost } from '../../lib/defaultFetch'

class Save extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ name: event.target.value })
    this.props.editMapName(event.target.value)
  }

  handleSubmit(event) {
    let payload = {
      name: this.state.name,
      imageSrc: this.props.imageSrc,
      width: this.props.width,
      height: this.props.height,
      tile_size: this.props.grid.tileSize
    }

    payload = JSON.stringify(payload)
    console.log(payload);

    this.props.upload(payload)
  }

  render() {
    return(
      <div>
        <h5>
          Save
          <Tooltip body="Name the map and submit it to the server." />
        </h5>
        <label className="medium">
          Map name
          <p>max 32 characters</p>
          <input className="form-input-text"
            type="text"name="mapname"
            placeholder=""
            maxLength="32"
            value={this.state.name}
            onChange={this.handleChange}
            />
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.maps.name,
    imageSrc: state.maps.imageSrc,
    width: state.maps.mapWidth,
    height: state.maps.mapHeight,
    grid: state.maps.grid
  }
}

const mapDispatchToProps = {
  editMapName,
  upload
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
