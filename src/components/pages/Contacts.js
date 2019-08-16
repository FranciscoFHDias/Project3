import React from 'react'
import Footer from '../common/Footer'





class Contacts extends React.Component{

  render() {
    return(
      <section className="section">
        <section className="hero is-fullheight is-black">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1 has-text-centered">Contacts</h1>
              <div className="level">
                <div className="level-item has-text-centered">
                  <h1>First column</h1>
                </div>
                <div className="level-item has-text-centered">
                  <h1>Second column</h1>
                </div>
                <div className="level-item has-text-centered">
                  <h1>third column</h1>
                </div>
              </div>
              <h2 className="subtitle has-text-centered">
              Our Team
              </h2>
              <hr/>
              <h2 className="subtitle has-text-centered">
              the best of the best
              </h2>
            </div>
          </div>
        </section>



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
