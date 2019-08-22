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

class EditUser extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeNormal = this.handleChangeNormal.bind(this)
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

  handleChangeNormal(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/profiles/${this.props.match.params.id}`, {...this.state.formData}, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        toast.success('User suceessfully updated')
        Auth.setUser(res.data)
        this.props.history.push('/profiles/')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log(this.state.formData.image)
    const smokerSelectedOption = this.booleanTranslate(this.state.formData.smoker)
    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <div className="box">
                <h3 className="title is-1 is-italic" > Edit </h3>
                <p className="subtitle has-text-black">You`ve changed!</p>


                <form onSubmit={this.handleSubmit}>

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
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        name="username"
                        placeholder="eg: Philip1992"
                        value={this.state.formData.username || ''}
                        onChange={this.handleChangeNormal}
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
                        onChange={this.handleChangeNormal}
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
                  <div className="field">
                    <label className="label">Please confirm your password</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        name="password"
                        placeholder="eg: ******"
                        onChange={this.handleChangeNormal}
                      />
                    </div>
                    {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                    <div className="field">
                      <label className="label">Password Confirmation</label>
                      <div className="control">
                        <input
                          className="input is-rounded"
                          type="password"
                          name="passwordConfirmation"
                          placeholder="eg: ••••••••"
                          onChange={this.handleChangeNormal}
                        />
                      </div>
                    </div>
                  </div>


                  <br />

                  <div className="has-text-centered">
                    <button className="button">Submit</button>
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
