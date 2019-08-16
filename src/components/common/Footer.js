import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <div className="columns">
          <div className="column">
            <div className="list">
              <Link to="/about">About</Link>
              <Link to="/contacts">Contact Us</Link>
              <Link to="/termsconditions">Terms and Conditions</Link>
            </div>
          </div>
          <div className="column">
          </div>
          <div className="column">
          </div>
          <div className="column">
            <h1 className="content has-text-danger">
            TEST
            </h1>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
