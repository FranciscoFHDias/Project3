import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Select from 'react-select'
import ReactFilestack from 'filestack-react'
import { fileloaderKey } from '../../../config/environment'
import Auth from '../../lib/Auth'

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
      file: null,
      user: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    this.setState({ user: this.props.location.state })
  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/profiles/${this.state.user._id}`, {...this.state.formData}, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        toast.success(res.data.message)
        console.log(this.state)
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  render() {
    console.log(this.state)
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h3 className="title is-2">Tell Us More!</h3>

              <div className="box is-light">

                <form onSubmit={this.handleSubmit}>

                  <div className="field">
                    <label className="label">Image</label>

                    <ReactFilestack
                      apikey={fileloaderKey}
                      buttonText="Upload Photo"
                      buttonClass="button"
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
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Preferences
