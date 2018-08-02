import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <label htmlFor="name">Type</label>
          <select id="dropdown" value="farmer">
                <option value="N/A" disabled>Your current type</option>
                <option value="Farmer">Farmer</option>
                <option value="fci">FCI</option>
            </select>

          <br />

          <label htmlFor="name">Grains holdings</label>
          <input id="name" type="number" placeholder="in tonnes" />

          <br />

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
