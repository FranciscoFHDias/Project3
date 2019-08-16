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

  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/locations', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/locations'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                placeholder="eg: LoveExp Cafe"
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>
            <div className="field">
              <label className="label">Address</label>
              <input
                className="input"
                name="address"
                placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
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
              />
              {this.state.errors.actType && <small className="help is-danger">{this.state.errors.actType}</small>}
            </div>
            <div className="field">
              <label className="label">Date Number</label>
              <input
                className="input"
                type="number"
                name="actType"
                placeholder="Restaurant and Bars"
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
              />
              {this.state.errors.contactNumber && <small className="help is-danger">{this.state.errors.contactNumber}</small>}
            </div>

            <div className="field">
              <label className="label">Link</label>
              <input
                className="input"
                type="string"
                name="link"
              />
              {this.state.errors.link && <small className="help is-danger">{this.state.errors.link}</small>}
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </section>

    )
  }
}

export default New
