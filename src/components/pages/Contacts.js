import React from 'react'
import Footer from '../common/Footer'





class Contacts extends React.Component{

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


        <div className="container">
          <form>
            <div className="field">
              <label className="label">Name (required)</label>
              <div className="control">
                <input
                  className="input"
                  name="username"
                  placeholder="eg: Donald"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email (required)</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="eg: donaldduck@baldandsexy.com"
                />
              </div>
            </div>



            <div className="field">
              <label className="label">Subject</label>
              <div className="control">
                <input
                  className="input"
                  name="surname"
                  placeholder="eg: Duck"
                />
              </div>

              <div className="field">
                <label className="label">Message</label>
                <div className="control">
                  <textarea className="textarea" placeholder="e.g. Hello world"></textarea>
                </div>
              </div>
              <button className="button">Submit</button>
            </div>
          </form>
        </div>







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
