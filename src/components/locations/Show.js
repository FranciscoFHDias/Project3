import React from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import LikeButton from '../common/LikeButton'
import StarRatingComponent from 'react-star-rating-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen, faEnvelope } from '@fortawesome/free-solid-svg-icons'


const Map = ReactMapboxGl({
  accessToken: process.env.MAPKEY
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

    if(!this.state.location) return null

    console.log(this.state.location)
    return(

      <section className="section">
        <div className="container ">

          <div className="tile is-parent">
            <article className="tile is-child">
              <h1 className="title is-1">{this.state.location.name}</h1>
              <figure id="showImage" className="image is-3by1" style={{backgroundImage: `url(${this.state.location.image}`}}>
              </figure>
            </article>
          </div>

          <div className="container show-page ">
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
                      <h1 className="title is-6">Tel:</h1>
                      <a href={`tel: ${this.state.location.contactNumber}`} data-rel="external"><p className="text is-6">{this.state.location.contactNumber}</p></a>

                      <h1 className="title is-6">Link:</h1>
                      <a href={this.state.location.link}><p className="text is-6">{this.state.location.link}</p></a>

                      <h1 className="title is-6">Address:</h1>
                      <p className="text is-6">{this.state.location.addressLine1}</p>
                      <p className="text is-6">{this.state.location.addressLine2}</p>
                      <p className="text is-6">{this.state.location.addressCity}</p>
                      <p className="text is-6">{this.state.location.addressPostCode}</p>
                      <h2 className="title is-6">Description:</h2>
                      <p className="text is-6">{this.state.location.desc}</p>
                      <br />
                      {Auth.isAuthenticated() && <div className="buttons">
                        <Link className="edit" to={`/locations/${this.state.location._id}/edit`}><FontAwesomeIcon icon={faPen} /></Link>
                        <Link className="erase" onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /></Link>
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
                <div className="tile is-parent" style={{ width: '100%', height: '100%' }}>
                  <Map
                    className="map"
                    style="mapbox://styles/mapbox/streets-v9"
                    zoom={zoom}
                    center={[this.state.location.longitude, this.state.location.latitude]}
                    containerStyle={{
                      height: '100%',
                      width: '100%'
                    }}
                  >
                    <Marker
                      coordinates={[this.state.location.longitude, this.state.location.latitude]}
                      anchor="bottom">
                      <img width="30px" height="30px" src={mapMarker} />
                    </Marker>
                  </Map>
                </div>
              </div>
            </div>
          </div>

          <br />
          <h1 className="title is-3"> Comments:   </h1>


          <div className="tile is-parent">
            <article className="tile is-child notification">

              <div className="columns is-multiline">

                <div className="column">

                  <div className="tile is-parent">
                    <article className="comments tile is-child notification">

                      {this.state.location.comments.map(comment =>
                        <Comment
                          className="comment"
                          key={comment._id}
                          {...comment}
                          handleDeleteComment={this.handleDeleteComment} />

                      )}
                    </article>
                  </div>
                  <br />
                  {Auth.isAuthenticated() && <div className="media-right">

                  </div>}
                </div>

                <div className="column">

                  {Auth.isAuthenticated() && <form onSubmit={this.handleSubmit}>
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
                    <div className="field">
                      <textarea
                        name="content"
                        className="textarea"
                        placeholder="Add a comment..."
                        onChange={this.handleChangeContent}
                        value={this.state.formData.content}
                      />
                    </div>

                    <button className="submiticon" ><FontAwesomeIcon className="icon" icon={faEnvelope} /></button>
                  </form>}
                </div>
              </div>
            </article>
          </div>

        </div>
      </section>
    )
  }

}

export default ShowLocation
