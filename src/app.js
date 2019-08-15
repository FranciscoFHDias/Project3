import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'

import 'bulma'
import './style.scss'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
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
