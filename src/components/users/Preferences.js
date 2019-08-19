import React from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
import Select from 'react-select'
import ReactFilestack from 'filestack-react'

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

const options = {
  accept: 'image/*',
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}

class Preferences extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      file: null
    }

    this.handleChange = this.handleChange.bind(this)

  }

  componentDidMount() {
    this.setState({ ...this.props.location.state })
  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  render() {
    console.log(this.state.formData)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Image</label>
              <ReactFilestack
                apikey=''
                buttonText="Upload Photo"
                buttonClass="button is-primary"
                className="upload-image"
                options={options}
                onSuccess={(result) => this.handleUploadImages(result)}
                preload={true}
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
