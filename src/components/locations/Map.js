import React from 'react'
import axios from'axios'
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import StarRatings from 'react-star-ratings'
import Select from 'react-select'
import _ from 'lodash'



const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZnJhbmNpc2NvZmhkaWFzIiwiYSI6ImNqemI5MTFiajA4NzYzbXBoZWd6NGtndTAifQ.oDArT5qLRW4i6FUT3Cut-w'
})

const zoom = [12, 16]
const mapMarker = '../../img/http___pluspng.com_img-png_heart-png-hd-transparent-background-3d-red-heart-transparent-background-1920.png'

const dateNumOptions = [
  { value: 0, label: 'All' },
  { value: 1, label: 'First Date' },
  { value: 2, label: 'Second Date' },
  { value: 3, label: 'Third Date' },
  { value: 4, label: 'Fourth Date' },
  { value: 5, label: 'Fifth Date' }
]

const actTypeOptions = [
  { value: '', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Relaxing', label: 'Relaxing' },
  { value: 'Outdoors', label: 'Outdoors' },
  { value: 'Restaurants and Bars', label: 'Restaurants and Bars' },
  { value: 'Music', label: 'Music' },
  { value: 'Overnight Stay', label: 'Overnight Stay' },
  { value: 'Nightlife', label: 'Nightlife' },
  { value: 'Cultural', label: 'Cultural' },
  { value: 'Misc', label: 'Misc' }
]

const budgetOptions = [
  { value: 0, label: 'All' },
  { value: 1, label: 'Under £10' },
  { value: 2, label: '£10 - £25' },
  { value: 3, label: '£25 - £50' },
  { value: 4, label: '£50 - £100' },
  { value: 5, label: 'Over £100' }
]

class MapLocations extends React.Component {

  constructor() {
    super()

    this.state = {
      centre: [-0.127758, 51.507351],
      locations: [],
      actType: '',
      dateNum: 0,
      cost: 0
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleFilter = this.handleFilter.bind(this)

  }

  componentDidMount() {
    window.scrollTo(0, 0)
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

  handleFilter(selected, field) {
    this.setState({ [field]: selected.value })
  }

  filterLocations() {
    return _.filter(this.state.locations, location => {
      return (this.state.dateNum ? location.dateNum.includes(this.state.dateNum) : true) &&
        (this.state.actType ? location.actType.includes(this.state.actType) : true) &&
        (this.state.cost ? location.cost === this.state.cost : true )
    })
  }


  render() {
    if(!this.state.locations) return null
    console.log(this.state.name)
    return(
      <section className="section">
        <div className="container">

          <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-item">
              <div className="field">
                <label className="label">Date No.</label>
                <Select
                  name="dateNum"
                  options={dateNumOptions}
                  defaultValue={dateNumOptions[0]}
                  onChange={selected => this.handleFilter(selected, 'dateNum')}
                  value={dateNumOptions.find(option => option.value === this.state.dateNum)}
                />
              </div>
            </div>
            <div className="navbar-item">
              <div className="field">
                <label className="label">Activity Type</label>
                <Select
                  name="actType"
                  options={actTypeOptions}
                  defaultValue={actTypeOptions[0]}
                  onChange={selected => this.handleFilter(selected, 'actType')}
                  value={actTypeOptions.find(option => option.value === this.state.actType)}
                />
              </div>
            </div>
            <div className="navbar-item">
              <div className="field">
                <label className="label">Budget</label>
                <Select
                  name="cost"
                  options={budgetOptions}
                  defaultValue={budgetOptions[0]}
                  onChange={selected => this.handleFilter(selected, 'cost')}
                  value={budgetOptions.find(option => option.value === this.state.cost)}
                />
              </div>
            </div>
          </nav>

          <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={zoom}
            center={this.state.centre}
            containerStyle={{
              height: '600px',
              width: '100%'
            }}
          >
            {this.filterLocations().map(location =>

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
