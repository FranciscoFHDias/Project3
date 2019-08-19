import React from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import LikeButton from '../common/LikeButton'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZnJhbmNpc2NvZmhkaWFzIiwiYSI6ImNqemI5MTFiajA4NzYzbXBoZWd6NGtndTAifQ.oDArT5qLRW4i6FUT3Cut-w'
})

const zoom = [16]
const mapMarker = '../../img/http___pluspng.com_img-png_heart-png-hd-transparent-background-3d-red-heart-transparent-background-1920.png'

class ShowLocation extends React.Component {

  constructor() {
    super()

    this.state = {
      formData: {
        content: '',
        rating: 5
      },
      postcode: 'E1 7PT',
      latitude: 0,
      longitude: 0
    }

    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleChangeRating = this.handleChangeRating.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)

  }

  componentDidMount() {
    axios.get(`api/locations/${this.props.match.params.id}`)
      .then(res => this.setState({ locations: res.data }))
    // const postCode = locations.postCode
    axios.get(`https:/api.postcodes.io/postcodes/${this.state.postcode}`)
      .then(res => this.setState({ longitude: res.data.result.longitude, latitude: res.data.result.latitude})
      )
  }

  handleChangeContent(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleChangeRating(e) {
    const formData = { ...this.state.formData, rating: e }
    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`/api/locations/${this.props.match.params.id}/comments`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ locations: res.data, formData: { content: '', rating: 5 } }))
  }

  handleDelete(e) {
    e.preventDefault()

    axios.delete(`/api/locations/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/locations/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  handleDeleteComment(e) {

    axios.delete(`/api/locations/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ locations: res.data }))
  }


  render() {

    if(!this.state.locations) return null
    console.log(this.state.locations.averageRating)
    return(

      <section className="section">
        <div className="container">



          <div className="tile is-parent">
            <article className="tile is-child notification">

              <div className="columns">
                <div className="column">
                  <p className="title">{this.state.locations.name}</p>
                </div>

                <div className="column">
                  <StarRatings
                    rating={this.state.locations.averageRating}
                    starRatedColor="#FFC300"
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="5px"
                    name="averageRating"
                  />
                </div>

                <div className="column">
                  {Auth.isAuthenticated() && <div className="buttons">
                    <Link
                      className="button"
                      to={`/locations/${this.state.locations._id}/edit`}
                    >Edit</Link>

                    <button className="button is-danger" onClick={this.handleDelete}>Delete</button>

                    <LikeButton />
                  </div>}
                </div>

              </div>

              <hr />

              <div className="content">
                <p className="text is-6">{this.state.locations.address}</p>
                <p className="text is-6">{this.state.locations.cost}</p>
              </div>

            </article>
          </div>

          <div className="tile is-parent">
            <article className="tile is-child notification">
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                zoom={zoom}
                center={[this.state.longitude, this.state.latitude]}
                containerStyle={{
                  height: '500px',
                  width: '100%'
                }}
              >
                <Marker
                  coordinates={[this.state.longitude, this.state.latitude]}
                  anchor="bottom">
                  <img width="30px" height="30px" src={mapMarker} />
                </Marker>
              </Map>
            </article>
          </div>

          <div className="tile is-parent">
            <article className="tile is-child notification">

              {this.state.locations.comments.map(comment =>
                <Comment key={comment._id} {...comment} handleDeleteComment={this.handleDeleteComment} />
              )}
              {Auth.isAuthenticated() && <div className="media-right">

              </div>}

              {Auth.isAuthenticated() && <form onSubmit={this.handleSubmit}>
                <hr />
                <div className="field">
                  <textarea
                    name="content"
                    className="textarea"
                    placeholder="Add a comment..."
                    onChange={this.handleChangeContent}
                    value={this.state.formData.content}
                  />
                </div>
                <div className="field">
                  <StarRatings
                    name="rating"
                    starRatedColor="#FFC300"
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="5px"
                    changeRating={this.handleChangeRating}
                    rating={this.state.formData.rating}
                  />

                </div>
                <button className="button is-info">Submit</button>
              </form>}
            </article>
          </div>

        </div>
      </section>
    )
  }

}

export default ShowLocation