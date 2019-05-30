import React from 'react'
import LinkButton from './LinkButton'

const UserShow = props => {
  let user = props.user
  let elems
  if (props.loading) {
    elems = {
      avatar: <div className="placeholder av-placeholder" />,
      username: <h3 className="placeholder">Loading</h3>,
      discord: <h4 className="placeholder">Loading</h4>,
      bio: <p className="placeholder">Loading<br />Loading</p>
    }
  }
  else {
    elems = {
      avatar: <img src={user.avatar_url} />,
      username: <h3 className="bold">{user.nick || user.username}</h3>,
      discord: <h4 className="discord-tag">{user.username}#{user.discriminator}</h4>,
      bio: <p>{user.bio}</p>
    }
  }

  return(
    <div className="panel">
      <div className="bar">
        <div className="bar-section av-container">
          {elems.avatar}
        </div>
        <div className="bar-section name-container">
          {elems.username}
          {elems.discord}
        </div>
      </div>
      <hr />
      <div className="row">
        {elems.bio}
      </div>
    </div>
  )
}

export default UserShow
