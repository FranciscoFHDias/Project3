import React from 'react'
import Footer from '../common/Footer'
import axios from 'axios'


class Contacts extends React.Component{

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(e) {
    e.preventDefault()
    // TODO: make a POST request to /api/send with the formData
    axios.post('/api/send', this.state.formData)
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    // TODO: hook up the handleChange to the input fields as usual
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  render() {
    return(
      <section className="section">
        <section className="hero is-black">
          <div className="hero-body">
            <div className="container">
              <h2 className="title is-2 has-text-centered">Contact Us</h2>
              <div className="level">
              </div>
            </div>
          </div>
        </section>
        <hr/>





        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" name="name" placeholder="eg: Donald"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Email address</label>
            <div className="control">
              <input className="input" type="email" name="email" placeholder="eg: donaldduck@baldandsexy.com"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" placeholder="e.g. Hello world"></textarea>
            </div>
          </div>
          <button className="button">Submit</button>
        </form>








        <section className="section">
          <div className="container">
            <div className="columns is-centered">

              <div className="column is-one-third'">
                <h1>first Column</h1>
              </div>
              <div className="column is-one-third">
                <h1>second Column</h1>
              </div>
              <div className="column is-one-third">
                <h1>third Column</h1>
              </div>

            </div>
          </div>
        </section>
        <Footer />
      </section>



    )
  }

}

export default Contacts
