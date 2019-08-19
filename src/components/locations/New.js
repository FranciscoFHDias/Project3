import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Select from 'react-select'

const dateNumOptions = [
  { value: 1, label: 'First Date' },
  { value: 2, label: 'Second Date' },
  { value: 3, label: 'Third Date' },
  { value: 4, label: 'Fourth Date' },
  { value: 5, label: 'Fifth Date' }
]

const actTypeOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Relaxing', label: 'Relaxing' },
  { value: 'Outdoors', label: 'Outdoors' },
  { value: 'Restaurants and Bars', label: 'Restaurants and Bars' },
  { value: 'Music', label: 'Music' },
  { value: 'Overnight Stay', label: 'Overnight Stay' },
  { value: 'Nightlife', label: 'Nightlife' },
  { value: 'Cultural', label: 'Cultural' },
  { value: 'Misc', label: 'Misc' }
]

const budgetOptions = [
  { value: 1, label: 'Under £10' },
  { value: 2, label: '£10 - £25' },
  { value: 3, label: '£25 - £50' },
  { value: 4, label: '£50 - £100' },
  { value: 5, label: 'Over £100' }
]

class New extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/locations', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/locations'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  handleMultiChange(selectedOptions, data) {
    const options = selectedOptions.map(selectedOption => selectedOption.value)
    const formData = { ...this.state.formData, [data.name]: options}
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
                    <Select
                      name="cost"
                      options={budgetOptions}
                      onChange={this.handleChange}
                    />
                    {this.state.errors.cost && <small className="help is-danger">{this.state.errors.cost}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Activity Type</label>
                    <Select
                      isMulti
                      name="actType"
                      options={actTypeOptions}
                      onChange={this.handleMultiChange}
                    />
                    {this.state.errors.actType && <small className="help is-danger">{this.state.errors.actType}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Date Number</label>
                    <Select
                      isMulti
                      name="dateNum"
                      options={dateNumOptions}
                      onChange={this.handleMultiChange}
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