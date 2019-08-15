import React from 'react'
import Select from 'react-select'

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
  { value: '1', label: 'Under £10' },
  { value: '2', label: '£10 - £25' },
  { value: '3', label: '£25 - £50' },
  { value: '4', label: '£50 - £100' },
  { value: '5', label: 'Over £100' }
]

const Home = () => {
  return (
    <section className="hero is-fullheight is-black">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Date Night</h1>
          <div className="level">
            <div className="level-item has-text-centered">
              <div className="field">
                <label className="label">Date No.</label>
                <Select
                  name="dateNum"
                  options={dateNumOptions}
                />
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div className="field">
                <label className="label">Activity Type</label>
                <Select
                  name="actType"
                  options={actTypeOptions}
                />
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div className="field">
                <label className="label">Budget</label>
                <Select
                  name="budget"
                  options={budgetOptions}
                />
              </div>
            </div>
          </div>
          <h2 className="subtitle has-text-centered">
            <a className="button is-large is-danger is-rounded">Show me everything!</a>
          </h2>
        </div>
      </div>
    </section>
  )
}

export default Home
