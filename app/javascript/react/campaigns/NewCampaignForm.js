import React from 'react';
import Form from '../lib/Form';

class NewCampaignForm extends Form {
  getFields() {
    return [
      {
        name: "name",
        label: "Name",
        type: "text"
      }
    ]
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch(`/api/v1/campaigns`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(this.payload()),
      headers: {
        'Content-Type': 'application/json',
        'x-CSRF-Token': this.getCSRFToken()
      }
    })
      .then(res => {
        if (res.ok) { return res }
        else {
          let error = new Error(`${res.status} ${res.statusText}`)
          throw(error)
        }
      })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
      })
      .catch(e => {
        console.error(`error in form submission: ${e.message}`)
      })
  }

  render() {
    return(
      <div>
        <h2>New Campaign</h2>
        {this.renderForm()}
      </div>
    )
  }
}

export default NewCampaignForm