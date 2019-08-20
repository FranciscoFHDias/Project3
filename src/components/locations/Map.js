import React from 'react'
import axios from'axios'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZnJhbmNpc2NvZmhkaWFzIiwiYSI6ImNqemI5MTFiajA4NzYzbXBoZWd6NGtndTAifQ.oDArT5qLRW4i6FUT3Cut-w'
})

const zoom = [12, 16]
const mapMarker = '../../img/http___pluspng.com_img-png_heart-png-hd-transparent-background-3d-red-heart-transparent-background-1920.png'


class MapLocations extends React.Component {

  constructor() {
    super()
    this.state= {}

  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => {
        this.setState({ locations: res.data})
      })

  }

  render() {
    if(!this.state) return null
    console.log(this.state.locations)
    return(

      <section className="section">
        <div className="container">

          <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={zoom}
            center={[-0.127758, 51.507351]}
            containerStyle={{
              height: '1000px',
              width: '100%'
            }}
          >
            <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
              {Object.keys(stations).map((stationK, index) => (
                <Feature
                  key={stationK}
                  onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                  onMouseLeave={this.onToggleHover.bind(this, '')}
                  onClick={this.markerClick.bind(this, stations[stationK])}
                  coordinates={stations[stationK].position}
                />
              ))}
            </Layer>
          </Map>
        </div>
      </section>

    )
  }


}

export default MapLocations
