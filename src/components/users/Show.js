import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

class ShowUser extends React.Component {

  constructor() {
    super()

    this.state = {
      user: {}
    }

  }

  componentDidMount() {
    axios.get(`/api/profiles/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
  }

  booleanTranslate() {
    if(this.state.user.smoker === true) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  ageTranslate(){
    if(this.state.user.age === 1) {
      return '18 - 25'
    } else if (this.state.user.age === 2) {
      return '25 - 30'
    } else if (this.state.user.age === 3) {
      return '30 - 40'
    } else if (this.state.user.age === 4) {
      return '50 - 65'
    } else {
      return '65+'
    }

  }

  render() {
    console.log(this.state)
    return(
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <div className="box is-warning">
                <figure className="image is-3by3">
                  <img src={this.state.user.image} alt={this.state.user.username}/>
                </figure>

                <div className="box">

                  <div className="content">
                    <h2>{this.state.user.username}</h2>

                    <p>Age: {this.ageTranslate(this.state.user.age)}</p>
                    <p>Gender: {this.state.user.gender}</p>
                    <p>Smoker: {this.booleanTranslate(this.state.user.smoker)}</p>

                    <br />

                    {Auth.getUser()._id === this.props.match.params.id && <div className="buttons">
                      <Link
                        className="button"
                        to={`/profiles/${this.state.user._id}/edit`}
                      >Edit</Link>
                    </div> }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default ShowUser
