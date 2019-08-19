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
  { value: 'Food', label: 'Food' },
  { value: 'Drinks', label: 'Drinks' },
  { value: 'Activity', label: 'Activity' }
]

const budgetOptions = [
  { value: 1, label: 'Under £10' },
  { value: 2, label: '£10 - £25' },
  { value: 3, label: '£25 - £50' },
  { value: 4, label: '£50 - £100' },
  { value: 5, label: 'Over £100' }
]

class Edit extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleArrayChange = this.handleArrayChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleDateNumChange = this.handleDateNumChange.bind(this)
    this.handleActTypeChange = this.handleActTypeChange.bind(this)

  }

  componentDidMount() {
    axios.get(`/api/locations/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.formData)
    axios.put(`/api/locations/${this.props.match.params.id}`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/locations/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleArrayChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value.split(',') }
    this.setState({ formData })
  }

  handleCostChange(e) {
    const formData = { ...this.state.formData, cost: e.value }
    this.setState({ formData })
  }

  handleDateNumChange(selectedDate) {
    const formData = { ...this.state.formData, dateNum: selectedDate.map(option => option.value) }
    this.setState({ formData })
    console.log(formData)
  }

  handleActTypeChange(selectedActType) {
    const formData = { ...this.state.formData, actType: selectedActType.map(option => option.value) }
    this.setState({ formData })
    console.log(formData)
  }

  render() {
    const selectedActType = (this.state.formData.actType || []).map(actType => ({ label: actType, value: actType }))
    const selectedDateNum = (this.state.formData.dateNum || []).map(dateNum => ({ label: dateNum, value: dateNum }))
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                type="string"
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
                type="string"
                placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
                value={this.state.formData.address || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.address && <small className="help is-danger">{this.state.errors.address}</small>}
            </div>
            <div className="field">
              <label className="label">Cost</label>
              <Select
                className="basic-multi-select"
                classNamePrefix="select"
                name="cost"
                options={budgetOptions}
                onChange={this.handleCostChange}
                value={budgetOptions.find(option => option.value === this.state.formData.cost)}
              />
              {this.state.errors.cost && <small className="help is-danger">{this.state.errors.cost}</small>}
            </div>
            <div className="field">
              <label className="label">Activity Type</label>
              <Select
                name='actType'
                options={actTypeOptions}
                isMulti
                onChange={this.handleActTypeChange}
                value={selectedActType}
              />
              {this.state.errors.actType && <small className="help is-danger">{this.state.errors.actType}</small>}
            </div>
            <div className="field">
              <label className="label">Date Number</label>
              <Select
                name='dateNum'
                options={dateNumOptions}
                isMulti
                onChange={this.handleDateNumChange}
                value={selectedDateNum}
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
                value={this.state.formData.contactNumber || 0}
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
      </section>

    )
  }
}

export default Edit
