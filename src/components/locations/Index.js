import React from 'react'
import { Link } from 'react-router-dom'
import Card from './IndexCard'
import Select from 'react-select'
import axios from 'axios'
import _ from 'lodash'

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

const sortOptions = [
  { value: 'name|asc', label: 'A - Z' },
  { value: 'name|desc', label: 'Z - A' },
  { value: 'cost|asc', label: 'Price: Low - High' },
  { value: 'cost|desc', label: 'Price: High - Low' }
]

class LocationsIndex extends React.Component{

  constructor() {
    super()

    this.state = {
      locations: [],
      actType: '',
      dateNum: 0,
      cost: 0,
      sortTerm: 'name|asc'
    }


    this.handleFilter = this.handleFilter.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/locations')
      .then(res => {
        this.setState({ ...this.props.location.state, locations: res.data, filteredLocations: res.data})
      })
  }

  handleFilter(selected, field) {
    this.setState({ [field]: selected.value })
  }

  filterLocations() {
    const [field, order] = this.state.sortTerm.split('|')
    const filtered = _.filter(this.state.locations, location => {
      return (this.state.dateNum ? location.dateNum.includes(this.state.dateNum) : true) &&
        (this.state.actType ? location.actType.includes(this.state.actType) : true) &&
        (this.state.cost ? location.cost === this.state.cost : true )
    })
    return _.orderBy(filtered, [field], [order])
  }

  handleChange(selected) {
    this.setState({ sortTerm: selected.value })
  }



  render() {
    window.addEventListener('scroll', function () {
      var scroll = this.scrollY
      console.log(scroll)
      if(scroll > 100){
        document.querySelector('.navbar').classList.add('solid')
      } else {
        document.querySelector('.navbar').classList.remove('solid')
      }
    })
    return(
      <section className="section">
        <div className="container">
          <nav className="navbar navbar-index is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-item">
              <div className="field">
                <label className="label has-text-left">Date Number</label>
                <Select
                  name="dateNum"
                  className="filter"
                  options={dateNumOptions}
                  defaultValue={dateNumOptions[0]}
                  onChange={selected => this.handleFilter(selected, 'dateNum')}
                  value={dateNumOptions.find(option => option.value === this.state.dateNum)}
                />
              </div>
            </div>
            <div className="navbar-item">
              <div className="field">
                <label className="label has-text-left">Activity Type</label>
                <Select
                  name="actType"
                  className="filter"
                  options={actTypeOptions}
                  defaultValue={actTypeOptions[0]}
                  onChange={selected => this.handleFilter(selected, 'actType')}
                  value={actTypeOptions.find(option => option.value === this.state.actType)}
                />
              </div>
            </div>
            <div className="navbar-item">
              <div className="field">
                <label className="label has-text-left">Budget</label>
                <Select
                  name="cost"
                  className="filter"
                  options={budgetOptions}
                  defaultValue={budgetOptions[0]}
                  onChange={selected => this.handleFilter(selected, 'cost')}
                  value={budgetOptions.find(option => option.value === this.state.cost)}
                />
              </div>
            </div>
            <div className="navbar-item">
              <div className="field">
                <label className="label has-text-left">Sort By</label>
                <Select
                  name="sortBy"
                  className="filter"
                  options={sortOptions}
                  defaultValue={sortOptions[0]}
                  onChange={this.handleChange}
                  value={sortOptions.find(option => option.value === this.state.sortTerm)}
                />
              </div>
            </div>
          </nav>
          <div className="columns is-multiline">
            {!this.state.locations && <h2 className="title is-2">Loading...</h2>}
            {this.filterLocations().map(location =>
              <div key={location._id} className="column is-half-tablet is-one-quarter-desktop">
                <Link to={`/locations/${location._id}`}>
                  <Card {...location} />
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
