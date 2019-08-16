import React from 'react'

class New extends React.Component {

  constructor() {
    super()
    this.state = {}

  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                placeholder="eg: LoveExp Cafe"
              />
            </div>
            <div className="field">
              <label className="label">Address</label>
              <input
                className="input"
                name="address"
                placeholder="eg: LoveExp Cafe, love cafe street, se16 6yy"
              />
            </div>
            <div className="field">
              <label className="label">Cost</label>
              <input
                className="input"
                name="cost"
                type="number"
                placeholder="eg: 1"
              />
            </div>
            <div className="field">
              <label className="label">Activity Type</label>
              <input
                className="input"
                type="string"
                name="actType"
                placeholder="Restaurant and Bars"
              />
            </div>
            <div className="field">
              <label className="label">Date Number</label>
              <input
                className="input"
                type="number"
                name="actType"
                placeholder="Restaurant and Bars"
              />
            </div>
            <div className="field">
              <label className="label">Image</label>
              <input
                className="input"
                type="string"
                name="image"
                placeholder="https://media-cdn.tripadvisor.com/media/photo-s/0f/00/25/b8/nando-s-mile-end.jpg"
              />
            </div>
            <div className="field">
              <label className="label">Contact Number</label>
              <input
                className="input"
                type="number"
                name="contactNumber"
                placeholder= "+442076507775"
              />
            </div>

            <div className="field">
              <label className="label">Link</label>
              <input
                className="input"
                type="string"
                name="link"
              />
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      </section>

    )
  }
}

export default New
