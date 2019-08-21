import React from 'react'
import Footer from '../common/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'


class Contacts extends React.Component{

  constructor() {
    super()
    this.state = {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.formData)
    // TODO: make a POST request to /api/send with the formData
    axios.post('/api/send', this.state.formData)
      .then(() => {
        toast.success('Thanks for contacting us, your message has been sent')
        this.setState({ formData: { name: '', email: '', message: '' } })
      })
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



        <section className="section">
          <div className="container">
            <div className="columns is-centered">



              <div className="column is-one-quarter">
              </div>

              <div className="column">
                <form id="contact-form" onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input" name="name" placeholder="eg: Donald" onChange={this.handleChange}
                        value={this.state.formData.name}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email address</label>
                    <div className="control">
                      <input className="input" type="email" name="email" placeholder="eg: donaldduck@baldandsexy.com" onChange={this.handleChange}
                        value={this.state.formData.email}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Message</label>
                    <div className="control">
                      <textarea className="textarea" name="message" placeholder="e.g. Hello world" onChange={this.handleChange}
                        value={this.state.formData.message}
                      ></textarea>
                    </div>
                  </div>
                  <button className="button is-info">Submit</button>
                </form>
              </div>


              <div className="column is-one-quarter">
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
