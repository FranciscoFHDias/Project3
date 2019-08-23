import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Select from 'react-select'
import ReactFilestack from 'filestack-react'
import { fileloaderKey } from '../../../config/environment'

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

const options = {
  accept: 'image/*',
  options: {
    resize: {
      width: 100
    }
  },
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}

class New extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {},
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
    this.handleChangeNormal = this.handleChangeNormal.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/locations', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/locations'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChangeNormal(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
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

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  render() {
    console.log(this.state.errors)


    return (

      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h3> New Space </h3>
              <p className="subtitle">Tell us about your fav</p>
              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <input
                      className="input"
                      name="name"
                      placeholder="eg: LoveExp Cafe"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
                  </div>

                  <div className="field">
                    <label className="label">Address Line 1</label>
                    <input
                      className="input"
                      name="addressLine1"
                      placeholder="eg: LoveExp Cafe"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.addressLine1 && <small className="help is-danger">{this.state.errors.addressLine1}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Address Line 2</label>
                    <input
                      className="input"
                      name="addressLine2"
                      placeholder="eg: Love cafe street"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.addressLine2 && <small className="help is-danger">{this.state.errors.addressLine2}</small>}
                  </div>
                  <div className="field">
                    <label className="label">City</label>
                    <input
                      className="input"
                      name="addressCity"
                      placeholder="eg: London"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.addressCity && <small className="help is-danger">{this.state.errors.addressCity}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Post Code</label>
                    <input
                      className="input"
                      name="addressPostCode"
                      placeholder="SE16 6YY"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.addressPostCode && <small className="help is-danger">{this.state.errors.addressPostCode}</small>}
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <textarea
                      className="textarea"
                      name="desc"
                      placeholder="Great Place love it!"
                      value={this.state.formData.desc || ''}
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.desc && <small className="help is-danger">{this.state.errors.desc}</small>}
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
                    <ReactFilestack
                      mode="transform"
                      apikey={fileloaderKey}
                      buttonText="Upload Photo"
                      buttonClass="button"
                      className="upload-image"
                      options={options}
                      onSuccess={(result) => this.handleUploadImages(result)}
                      preload={true}
                    />
                    {this.state.formData.image && <img src={this.state.formData.image} />}
                  </div>
                  <div className="field">
                    <label className="label">Contact Number</label>
                    <input
                      className="input"
                      type="number"
                      name="contactNumber"
                      placeholder= "+442076507775"
                      onChange={this.handleChangeNormal}
                    />
                    {this.state.errors.contactNumber && <small className="help is-danger">{this.state.errors.contactNumber}</small>}
                  </div>
                  <button className="submit">Submit</button>
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
