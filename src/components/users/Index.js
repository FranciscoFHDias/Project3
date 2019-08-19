import React from 'react'
import { Link } from 'react-router-dom'
import Card from './UserCard'
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
    console.log(this.state)
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
                    image={user.image}
                    username={user.username}
                    age={user.age}
                    gender={user.gender}
                    smoker={user.smoker}
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
