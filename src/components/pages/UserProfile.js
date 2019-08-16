import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

class Profile extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register', this.state.formData)
      .then(res => {
        toast.success(res.data.message)
        this.props.history.push('/login')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Early Morning or Late Riser</label>
              <div className="control">
                <input
                  className="input"
                  name="q1"
                  placeholder="Yes or No"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.q1 && <small className="help is-danger">{this.state.errors.q1}</small>}
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="q2"
                  placeholder="eg: leela3000@planetexpress.co.nny"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.q2 && <small className="help is-danger">{this.state.errors.q2}</small>}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="q3"
                  name="password"
                  placeholder="eg: ••••••••"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="q4"
                  placeholder="eg: ••••••••"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
            </div>

            <button className="button">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Profile
