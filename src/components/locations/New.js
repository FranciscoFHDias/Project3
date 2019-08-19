import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class New extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/locations', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/locations'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  render() {
    console.log(this.state.formData)
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">


              <h3 className="title is-1" > New Space </h3>
              <p className="subtitle has-text-black">Tell us about your fav</p>

              <div className="box is-light">

                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <input
                      className="input"
                      name="name"
                      placeholder="eg: LoveExp Cafe"
                      value={this.state.formData.name || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Address</label>
                    <input
                      className="input"
                      name="address"
                      placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
                      value={this.state.formData.address || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.address && <small className="help is-danger">{this.state.errors.address}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Cost</label>
                    <input
                      className="input"
                      name="cost"
                      type="number"
                      placeholder="eg: 1"
                      value={this.state.formData.cost || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.cost && <small className="help is-danger">{this.state.errors.cost}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Activity Type</label>
                    <input
                      className="input"
                      type="string"
                      name="actType"
                      placeholder="Restaurant and Bars"
                      value={this.state.formData.actType || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.actType && <small className="help is-danger">{this.state.errors.actType}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Date Number</label>
                    <input
                      className="input"
                      type="number"
                      name="dateNum"
                      placeholder="Restaurant and Bars"
                      value={this.state.formData.dateNum || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.dateNum && <small className="help is-danger">{this.state.errors.dateNum}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Image</label>
                    <input
                      className="input"
                      type="string"
                      name="image"
                      placeholder="https://media-cdn.tripadvisor.com/media/photo-s/0f/00/25/b8/nando-s-mile-end.jpg"
                      value={this.state.formData.image || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Contact Number</label>
                    <input
                      className="input"
                      type="number"
                      name="contactNumber"
                      placeholder= "+442076507775"
                      value={this.state.formData.contactNumber || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.contactNumber && <small className="help is-danger">{this.state.errors.contactNumber}</small>}
                  </div>

                  <div className="field">
                    <label className="label">Link</label>
                    <input
                      className="input"
                      type="string"
                      name="link"
                      value={this.state.formData.link || ''}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.link && <small className="help is-danger">{this.state.errors.link}</small>}
                  </div>
                  <button className="button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </section>

    )
  }
}

export default New
