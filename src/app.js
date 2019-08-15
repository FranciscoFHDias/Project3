import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import './style.scss'

import LocationsIndex from './components/locations/Index'

class App extends React.Component {

  render() {
    return(
      <HashRouter>


        <Switch>
          <Route path="/locations" component={LocationsIndex} />
        </Switch>

      </HashRouter>

    )
  }


}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
