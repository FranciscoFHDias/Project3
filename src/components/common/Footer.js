import React from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <div className="columns is-centered">
          <div className="column is-two-third">
            <nav className="breadcrumb has-bullet-separator is-fixed-bottom" aria-label="breadcrumbs">
              <ul>
                <span> <li><Link to="/about">About</Link> </li></span>
                <li><Link to="/contacts">Contact Us</Link></li>
                <span> <li><div><Modal /></div></li></span>
              </ul>
            </nav>
          </div>

          <div className="column is-one-third">
            <h5 className="has-text-grey-light">
            © DAFRAMISO Corporate
            </h5>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
