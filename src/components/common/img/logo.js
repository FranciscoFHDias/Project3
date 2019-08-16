import React from 'react'
import logo from '/logo.png' // Tell Webpack this JS file uses this image



function LogoCreator() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />
}

export default LogoCreator
