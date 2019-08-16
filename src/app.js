import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import LocationsIndex from './components/locations/Index'
import ShowLocation from './components/locations/Show'

import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/locations/:id" component={ShowLocation} />
          <Route path="/locations" component={LocationsIndex} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
