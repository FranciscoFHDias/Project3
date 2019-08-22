import React from 'react'
import Footer from '../common/Footer'

class About extends React.Component{
  render() {
    return(
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered has-text-danger"><img width="200" src="./img/Date-a-base-logo-red.png" alt="logo"/><br/>About Us</h1>

            <hr/>
            <h2 className="subtitle has-text-centered has-text-danger">The Dream Team</h2>

            <h4 className="subtitle has-text-centered">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </h4>
            <div className="container">
              <div className="columns is-centered">

                <div className="column is-one-fourth'">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src="./img/Date-a-base-logo-small.png" alt="logo" width="80%" className="glow"/>
                      </div>
                      <div className="flip-card-back">
                        <img src="./img/sola.png" alt="Sola"/>
                      </div>
                    </div>
                  </div>
                  <h2 className="title is-4 has-text-danger has-text-centered">ADESOLA ONI-SHOGBONYO</h2>
                  <h4 className="subtitle has-text-centered">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </h4>
                </div>


                <div className="column is-one-fourth'">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src="./img/Date-a-base-logo-small.png" alt="logo" width="80%" className="glow"/>
                      </div>
                      <div className="flip-card-back">
                        <img src="./img/francisco.png" alt="Francisco"/>
                      </div>
                    </div>
                  </div>
                  <h2 className="title is-4 has-text-danger has-text-centered">FRANCISCO F. H. DIAS</h2>
                  <h4 className="subtitle has-text-centered">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </h4>
                </div>

                <div className="column is-one-fourth'">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src="./img/Date-a-base-logo-small.png" alt="logo" width="80%" className="glow"/>
                      </div>
                      <div className="flip-card-back">
                        <img src="./img/michael.png" alt="Michael"/>
                      </div>
                    </div>
                  </div>
                  <h2 className="title is-4 has-text-danger has-text-centered">MICHAEL G. LAIRD</h2>
                  <h4 className="subtitle has-text-centered">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </h4>
                </div>

                <div className="column is-one-fourth'">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src="./img/Date-a-base-logo-small.png" alt="logo" width="80%"  className="glow"/>
                      </div>
                      <div className="flip-card-back">
                        <img src="./img/daniele.png" alt="Daniele"/>
                      </div>
                    </div>
                  </div>
                  <h2 className="title is-4 has-text-danger has-text-centered">DANIELE NOCITO</h2>
                  <h4 className="subtitle has-text-centered">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </h4>
                </div>
              </div>
              <div>
                <hr/>
                <h2 className="subtitle has-text-centered has-text-danger">
                The DATE-A-BASE
                </h2>
                <h4 className="subtitle has-text-centered">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h4>
                <div>
                  <hr/>
                  <h2 className="subtitle has-text-centered has-text-danger">
                  Next projects
                  </h2>
                  <h4 className="subtitle has-text-centered">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    <ul>
                      <li>whether the website conducts sales</li>
                      <li>whether the website has further policies</li>
                    </ul>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    )
  }
}

export default About
