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

  render() {
    console.log(this.state)
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <figure className="image is-3by3">
                <img src={this.state.user.image} alt={this.state.user.username}/>
              </figure>
              <div className="content">
                <h1 className="title">{this.state.user.username}</h1>
                <br />

                {Auth.getUser()._id === this.props.match.params.id && <div className="buttons">
                  <Link
                    className="button"
                    to={`/profiles/${this.state.user._id}/edit`}
                  >Edit</Link>

                  <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
                </div> }
              </div>
            </div>
            <div className="column is-two-thirds">
              <div className="content">
                <p>Age: {this.state.user.age}</p>
                <p>Gender: {this.state.user.gender}</p>
                <p>Smoker: {this.booleanTranslate(this.state.user.smoker)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default ShowUser
