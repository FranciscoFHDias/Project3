import React from 'react'
import { Link } from 'react-router-dom'



class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false
    }

  }


  render(){
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <i className="fab fa-react"></i> <i className="fas fa-subway"></i>
            </Link>
          </div>
          <div className="navbar-end">
            <Link to="/register" className="navbar-item">Register</Link>
            <Link to="/login" className="navbar-item">Login</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
