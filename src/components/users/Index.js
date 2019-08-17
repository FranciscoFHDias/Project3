import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../locations/indexCard'
import axios from 'axios'

class UsersIndex extends React.Component{

  constructor() {
    super()

    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('/api/profiles')
      .then(res => {
        this.setState({ users: res.data })
      })
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.users.map(user =>
              <div
                key={user._id}
                className="column is-half-tablet is-one-quarter-desktop"
              >
                <Link to={`/profiles/${user._id}`}>
                  <Card
                    name={user.username}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default UsersIndex
