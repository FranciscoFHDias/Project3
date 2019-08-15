import React from 'react'
import ReactDOM from 'react-dom'

import Home from './components/pages/Home'

import 'bulma'
import './style.scss'

class App extends React.Component {

  render() {
    return (
      <Home />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
