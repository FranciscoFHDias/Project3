import React from 'react'
import axios from'axios'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import StarRatings from 'react-star-ratings'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZnJhbmNpc2NvZmhkaWFzIiwiYSI6ImNqemI5MTFiajA4NzYzbXBoZWd6NGtndTAifQ.oDArT5qLRW4i6FUT3Cut-w'
})

const zoom = [12, 16]
const mapMarker = '../../img/http___pluspng.com_img-png_heart-png-hd-transparent-background-3d-red-heart-transparent-background-1920.png'


class MapLocations extends React.Component {

  constructor() {
    super()

    this.state = {
      centre: [-0.127758, 51.507351]
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => {
        console.log(res.data)
        this.setState({ locations: res.data})
      })
  }

  handleMarkerClick(location) {
    this.setState({
      name: location.name,
      centre: [location.longitude, location.latitude],
      id: location._id,
      image: location.image,
      rating: location.averageRating
    })
  }


  render() {
    if(!this.state.locations) return null
    console.log(this.state.name)
    return(
      <section className="section">
        <div className="container">

          <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={zoom}
            center={this.state.centre}
            containerStyle={{
              height: '700px',
              width: '100%'
            }}
          >
            {this.state.locations.map(location =>

              <Marker
                key={location._id}
                coordinates={[location.longitude, location.latitude]}
                anchor="bottom"
                onClick={() => this.handleMarkerClick(location)}>
                <img width="30px" height="30px" src={mapMarker} />
              </Marker>
            )}

            {this.state.name && <Popup
              className="tile is-parent"
              key={this.state.id}
              coordinates={this.state.centre}
              offset={{
                'bottom-left': [12, -38],
                'bottom': [0, -38],
                'bottom-right': [-12, -38]}}>


              <article className="tile is-child">

                <Link to={`/locations/${this.state.id}`}>
                  <p className="title is-7">{this.state.name}</p>


                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="#FFC300"
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="2px"
                    name="averageRating"
                  />
                  <figure className="image is-4by3">
                    <img src={this.state.image}/>
                  </figure>
                </Link>
              </article>

            </Popup>}

          </Map>
        </div>
      </section>

    )
  }


}

export default MapLocations
