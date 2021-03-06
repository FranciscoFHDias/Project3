import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './components/pages/Home'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import SecureRoute from './components/common/SecureRoute'

import LocationsIndex from './components/locations/Index'
import EditLocation from './components/locations/Edit'
import ShowLocation from './components/locations/Show'
import New from './components/locations/New'
import About from './components/pages/About'
import Contacts from './components/pages/Contacts'
import TermsConditions from './components/pages/TermsConditions'
import Edit from './components/locations/Edit'
import MapLocations from './components/locations/Map'

import Preferences from './components/users/Preferences'
import UsersIndex from './components/users/Index'
import ShowUser from './components/users/Show'
import EditUser from './components/users/Edit'

import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar />
        <ToastContainer position="bottom-right" hideProgressBar={true} />

        <Switch>

          <SecureRoute path="/locations/:id/edit" component={EditLocation} />
          <Route path="/login" component={Login} />
          <Route path="/register/preferences" component={Preferences} />
          <Route path="/register" component={Register} />
          <SecureRoute path="/locations/new" component={New} />
          <SecureRoute path="/locations/:id/edit" component={Edit} />
          <Route path="/profiles/:id/edit" component={EditUser} />
          <Route path="/profiles/:id" component={ShowUser} />
          <Route path="/profiles" component={UsersIndex} />
          <Route path="/locations/map" component={MapLocations} />
          <Route path="/locations/:id" component={ShowLocation} />
          <Route path="/locations" component={LocationsIndex} />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/termsconditions" component={TermsConditions} />
          <Route exact path="/" component={Home} />
        </Switch>

        <Footer />
      </HashRouter>

    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
