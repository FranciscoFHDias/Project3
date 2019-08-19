import React from 'react'
import axios from 'axios'

class ShowUser extends React.Component {

  constructor() {
    super()

    this.state = {}

  }

  componentDidMount() {
    axios.get(`api/profiles/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
  }

  render() {
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <p className="title">TEST</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default ShowUser
