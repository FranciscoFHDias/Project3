import React from 'react'
import { Link } from 'react-router-dom'
import Card from './indexCard'
import axios from 'axios'



class LocationsIndex extends React.Component{

  constructor() {
    super()

    this.state = { locations: [] }
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then( res => this.setState({ locations: res.data }))
  }

  render() {
    return(

      <section className="section">

        <div className="container">
          <div className="columns is-multiline">
            {!this.state.locations && <h2 className="title is-2">Loading...</h2>}
            {this.state.locations.map(location =>
              <div key={location._id} className="column is-half-tablet is-one-quarter-desktop">
                <Link to={`/locations/${location._id}`}>
                  <Card name={location.name} image={location.image} address={location.address} dateNum={location.dateNum} rating={location.rating || 5}/>
                </Link>
              </div>
            )}

          </div>
        </div>
      </section>

    )
  }

}

export default LocationsIndex
