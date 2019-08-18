import React from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
import Select from 'react-select'

const ageOptions = [
  { value: 1, label: '18 - 25' },
  { value: 2, label: '25 - 30' },
  { value: 3, label: '30 - 40' },
  { value: 4, label: '50 - 65' },
  { value: 5, label: '65+' }
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'na', label: 'Prefer not to say' }
]

const smokerOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
]

class Preferences extends React.Component {

  constructor() {
    super()
    this.state = {}

    this.handleChange = this.handleChange.bind(this)

  }

  componentDidMount() {
    this.setState({ ...this.props.formData.state })
  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Image</label>
              <input
                className="input"
                name="image"
                placeholder="eg: me.jpg"
              />
            </div>
            <div className="field">
              <label className="label">Age</label>
              <Select
                name="age"
                options={ageOptions}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Gender</label>
              <Select
                name="gender"
                options={genderOptions}
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Are you a smoker?</label>
              <Select
                name="smoker"
                options={smokerOptions}
                onChange={this.handleChange}
              />
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Preferences
