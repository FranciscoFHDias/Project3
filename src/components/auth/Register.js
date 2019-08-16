import React from 'react'
import { Link } from 'react-router-dom'

// import Login from './components/auth/Login'

class Register extends React.Component {

  constructor() {
    super()
    this.state = { }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  name="username"
                  placeholder="eg: loveExp"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="eg: example@example.co.uk"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="eg: ••••••••"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="eg: ••••••••"
                />
              </div>
            </div>

            <div>
              <Link to="/login" className="navbar-item">Already a user? Log in</Link>

            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Register
