import React from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import LikeButton from '../common/LikeButton'
import StarRatingComponent from 'react-star-rating-component'

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
        rating: 5,
        liked: false
      },
      latitude: 0,
      longitude: 0,
      likeCount: null
    }

    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleChangeRating = this.handleChangeRating.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleLike = this.handleLike.bind(this)

  }


  componentDidMount() {
    axios
      .get(`api/locations/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ location: res.data })
        axios
          .get(`https:/api.postcodes.io/postcodes/${res.data.postCode}`)
          .then(res => this.setState({ longitude: res.data.result.longitude, latitude: res.data.result.latitude})
          )
      })
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
    axios.post(`/api/locations/${this.props.match.params.id}/comments`, this.state.formData,
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ location: res.data, formData: { content: '', rating: 5 } }))
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
      .then(res => this.setState({ location: res.data }))
  }


  handleLike() {
    axios.post(`/api/locations/${this.props.match.params.id}/like`, null, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ location: res.data }))
  }

  isLiked(likes) {

    return likes.includes(Auth.getPayload().sub)
  }




  render() {


    console.log(this.state.location)

    if(!this.state.location) return null

    return(

      <section className="section">
        <div className="container">

          <div className="tile is-parent">
            <article className="tile is-child">
              <h1 className="title is-1">{this.state.location.name}</h1>
              <figure id="showImage" className="image is-3by1" style={{backgroundImage: `url(${this.state.location.image}`}}>
              </figure>
            </article>
          </div>

          <div className="columns is-multiline">

            <div className="column">
              <div className="tile is-parent">
                <article className="tile is-child notification">

                  <div className="content">

                    <div className="columns is-multiline">
                      <div className="column">
                        <StarRatingComponent
                          name="averageRating"
                          renderStarIcon={() => <span className="title is-3">£</span>}
                          editing={false}
                          starCount={5}
                          value={this.state.location.cost}
                        />
                      </div>
                      <div className="column">
                        <StarRatings
                          rating={this.state.location.averageRating}
                          starRatedColor="#FFC300"
                          numberOfStars={5}
                          starDimension="25px"
                          starSpacing="2px"
                          name="averageRating"
                        />
                      </div>
                    </div>
                    <hr/>

                    <h1 className="title is-6">tel:</h1>
                    <p className="text is-6">{this.state.location.contactNumber}</p>
                    <br/>
                    <h1 className="title is-6">link:</h1>
                    <p className="text is-6">{this.state.location.link}</p>
                    <br/>
                    <h1 className="title is-6">address:</h1>
                    <p className="text is-6">{this.state.location.address}</p>
                    <br />
                    {Auth.isAuthenticated() && <div className="buttons">
                      <Link
                        className="button"
                        to={`/locations/${this.state.location._id}/edit`}
                      >Edit</Link>

                      <button className="button is-danger" onClick={this.handleDelete}>Delete</button>

                      <LikeButton
                        liked={this.isLiked(this.state.location.likes)}
                        handleLike={this.handleLike}
                      />
                      <p className="subtitle">{this.state.location.likes.length} like </p>

                    </div>}

                  </div>

                </article>
              </div>
            </div>

            <div className="column">
              <div className="tile is-parent">
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
              </div>
            </div>
          </div>


          <div className="tile is-parent">
            <article className="tile is-child notification">
              <h1 className="title is-3"> Comments:   </h1>
              {this.state.location.comments.map(comment =>
                <Comment
                  key={comment._id}
                  {...comment}
                  handleDeleteComment={this.handleDeleteComment} />

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
