import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Select from 'react-select'
import ReactFilestack from 'filestack-react'
import { fileloaderKey } from '../../../config/environment'

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

class EditUser extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/profiles/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
  }

  booleanTranslate() {
    if(this.state.formData.smoker === true) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/profiles/${this.state.user._id}`, {...this.state.formData})
      .then(res => {
        toast.success(res.data.message)
        console.log(this.state)
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log(this.state.formData.smoker)
    const smokerSelectedOption = this.booleanTranslate(this.state.formData.smoker)
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <div className="column">


              <h3 className="title is-1 is-italic" > Edit </h3>
              <p className="subtitle has-text-black">You`ve changed!</p>

              <div className="box is-light">
                <figure className="avatar">
                  <img src={this.state.formData.image} />
                </figure>


                <form onSubmit={this.handleSubmit}>
                  <div className="column">
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
                      <label className="label">Username</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          name="username"
                          placeholder="eg: Philip1992"
                          value={this.state.formData.username || ''}
                          onChange={this.handleChange}
                        />
                      </div>
                      {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          type="email"
                          name="email"
                          placeholder="eg: philip1992@email.co.uk"
                          value={this.state.formData.email || ''}
                          onChange={this.handleChange}
                        />
                      </div>
                      {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                    </div>
                    <div className="field">
                      <label className="label">Age</label>
                      <Select
                        name="age"
                        options={ageOptions}
                        value={ageOptions.find(option => option.value === this.state.formData.age)}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Gender</label>
                      <Select
                        name="gender"
                        options={genderOptions}
                        value={genderOptions.find(option => option.value === this.state.formData.gender)}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Are you a smoker?</label>
                      <Select
                        name="smoker"
                        options={smokerOptions}
                        value={smokerOptions.find(option => option.label === smokerSelectedOption)}
                        onChange={this.handleChange}
                      />
                    </div>

                    <br />

                    <div className="has-text-centered">
                      <button className="button">Submit</button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>


      </section>
    )
  }
}

export default EditUser
