import React from 'react'
import ReactDOM from 'react-dom'

// import { HashRouter, Route, Switch } from 'react-router-dom'
//
// import Register from './components/auth/Register'
// import Navbar from './components/common/Navbar'

import 'bulma'


class App extends React.Component {


  constructor() {
    super()
    this.state = {}

  }

  render() {
    return (
      <h1>Hey There </h1>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
