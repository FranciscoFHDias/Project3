import React from 'react'
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

class Edit extends React.Component {

  constructor() {
    super()
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)

  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  handleMultiChange(selectedOptions, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOptions.map(selectedOption => selectedOption.value)}
    this.setState({ formData })
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
                placeholder="eg: LoveExp Cafe"
              />
            </div>
            <div className="field">
              <label className="label">Address</label>
              <input
                className="input"
                name="address"
                placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
              />
            </div>
            <div className="field">
              <label className="label">Cost</label>
              <Select
                value={this.state.formData.cost || ''}
                name="cost"
                options={budgetOptions}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Activity Type</label>
              <Select
                isMulti
                value={selectedActType}
                name="actType"
                options={actTypeOptions}
                onChange={this.handleMultiChange}
              />
            </div>
            <div className="field">
              <label className="label">Date Number</label>
              <Select
                isMulti
                value={selectedDateNum}
                name="dateNum"
                options={dateNumOptions}
                onChange={this.handleMultiChange}
              />
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input
                className="input"
                type="string"
                name="image"
                placeholder="https://media-cdn.tripadvisor.com/media/photo-s/0f/00/25/b8/nando-s-mile-end.jpg"
              />
            </div>
            <div className="field">
              <label className="label">Contact Number</label>
              <input
                className="input"
                type="number"
                name="contactNumber"
                placeholder= "+442076507775"
              />
            </div>

            <div className="field">
              <label className="label">Link</label>
              <input
                className="input"
                type="string"
                name="link"
              />
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </section>

    )
  }
}

export default Edit
