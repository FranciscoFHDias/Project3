import React from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZnJhbmNpc2NvZmhkaWFzIiwiYSI6ImNqemI5MTFiajA4NzYzbXBoZWd6NGtndTAifQ.oDArT5qLRW4i6FUT3Cut-w'
})

const zoom = [16]
const mapMarker = '../../img/http___pluspng.com_img-png_heart-png-hd-transparent-background-3d-red-heart-transparent-background-1920.png'


class MapLocations extends React.Component {



  render() {
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
          </Map>
        </div>
      </section>

    )
  }


}

export default MapLocations
