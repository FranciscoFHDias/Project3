import React from 'react'
import { Link } from 'react-router-dom'
import Card from './indexCard'
import Select from 'react-select'
import axios from 'axios'
import _ from 'lodash'

const dateNumOptions = [
  { value: '1', label: 'First Date' },
  { value: '2', label: 'Second Date' },
  { value: '3', label: 'Third Date' },
  { value: '4', label: 'Fourth Date' },
  { value: '5', label: 'Fifth Date' }
]

const actTypeOptions = [
  { value: 'active', label: 'Active' },
  { value: 'relaxing', label: 'Relaxing' },
  { value: 'outdoors', label: 'Outdoors' }
]

const budgetOptions = [
  { value: 1, label: 'Under £10' },
  { value: 2, label: '£10 - £25' },
  { value: 3, label: '£25 - £50' },
  { value: 4, label: '£50 - £100' },
  { value: 5, label: 'Over £100' }
]

class LocationsIndex extends React.Component{

  constructor() {
    super()

    this.state = {
      locations: [],
      filteredLocations: []
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then( res => this.setState({ locations: res.data, filteredLocations: res.data }))
  }

  handleSelect(e) {
    const filter = _.filter(this.state.locations, location => location.cost === e.value)
    this.setState({ filteredLocations: filter })
    console.log(this.state.filteredLocations)
  }

  render() {
    return(
      <section className="section">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-item">
            <div className="field">
              <label className="label">Date No.</label>
              <Select
                name="dateNum"
                options={dateNumOptions}
              />
            </div>
          </div>
          <div className="navbar-item">
            <div className="field">
              <label className="label">Activity Type</label>
              <Select
                name="actType"
                options={actTypeOptions}
              />
            </div>
          </div>
          <div className="navbar-item">
            <div className="field">
              <label className="label">Budget</label>
              <Select
                name="budget"
                options={budgetOptions}
                onChange={this.handleSelect}
              />
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="columns is-multiline">
            {!this.state.locations && <h2 className="title is-2">Loading...</h2>}
            {this.state.filteredLocations.map(location =>
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
