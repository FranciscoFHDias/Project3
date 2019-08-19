import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'


class LikeButton extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        liked: false
      }
    }
    this.handleLike = this.handleLike.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLike() {
    this.setState({ liked: !this.state.liked })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/locations/${this.props.match.params.id}/comments`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ locations: res.data }))
  }

  render() {
    const text = this.state.liked ? ' ' : ''
    const label = this.state.liked ? 'Unlike 💔' : ' Like 💗'

    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <button
            onClick={this.handleLike}
            className= "is-info">
            {label}
            <span>
              <i className="far fa-thumbs-up"></i>
            </span>
          </button>
          <p>
            {text}
          </p>

        </form>
      </div>
    )
  }
}
// 300 people have liked this
export default LikeButton
