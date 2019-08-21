import React from 'react'
import { Link } from 'react-router-dom'
import Card from './UserCard'
import axios from 'axios'
import Auth from '../../lib/Auth'

class UsersIndex extends React.Component{

  constructor() {
    super()

    this.state = {
      users: []
    }
    this.ageTranslate = this.ageTranslate.bind(this)
    this.booleanTranslate = this.booleanTranslate.bind(this)
  }

  componentDidMount() {
    axios.get('/api/profiles')
      .then(res => {
        this.setState({ users: res.data })
      })
  }

  ageTranslate(){
    if(this.state.users.age === 1) {
      return '18 - 25'
    } else if (this.state.users.age === 2) {
      return '25 - 30'
    } else if (this.state.users.age === 3) {
      return '30 - 40'
    } else if (this.state.users.age === 4) {
      return '50 - 65'
    } else {
      return '65+'
    }
  }

  booleanTranslate() {
    if(this.state.users.smoker === true) {
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
          <div className="columns is-multiline">
            {this.state.users.filter(user => user._id !== Auth.getUser()._id).map(user =>
              <div
                key={user._id}
                className="column is-half-tablet is-one-quarter-desktop"
              >
                <Link to={`/profiles/${user._id}`}>
                  <Card
                    image={user.image}
                    username={user.username}
                    age={this.ageTranslate(user.age)}
                    gender={user.gender}
                    smoker={this.booleanTranslate(user.smoker)}
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
