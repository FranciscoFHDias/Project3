import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'

import LocationsIndex from './components/locations/Index'
import ShowLocation from './components/locations/Show'
import New from './components/locations/New'
import About from './components/pages/About'
import Contacts from './components/pages/Contacts'
import TermsConditions from './components/pages/TermsConditions'

import Preferences from './components/users/Preferences'
import UsersIndex from './components/users/Index'
import ShowUser from './components/users/Show'

import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profiles/:id" component={ShowUser} />
          <Route path="/profiles" component={UsersIndex} />
          <Route path="/register/preferences" component={Preferences} />
          <Route path="/register" component={Register} />
          <SecureRoute path="/locations/new" component={New} />
          <Route path="/locations/:id" component={ShowLocation} />
          <Route path="/locations" component={LocationsIndex} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/termsconditions" component={TermsConditions} />
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
