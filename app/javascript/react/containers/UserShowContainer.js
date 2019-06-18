import React from 'react';
import FetchingComponent from '../components/FetchingComponent'
import UserShow from '../components/UserShow';

class UserShowContainer extends FetchingComponent {
  constructor(props) {
    super(props)
    this.state = {
      userData: {}
    }
    this.endpoint = `/api/v1/users/${props.userId}`
  }

  fetchCompleted(json) {
    this.setState({ userData: json })
  }

  yields() {
    return {
      loading: <UserShow loading />,
      loaded: <UserShow user={this.state.userData} userId={this.props.userId} />,
      error: <div className="row panel">Something went wrong while retrieving data. Try reloading.</div>
    }
  }
}

export default UserShowContainer
