import React from 'react'

const Logo = () => {
  return (
    <div className="flip-logo">
      <div className="flip-logo-inner">
        <div className="flip-logo-front">
          <img src="/logo2.png" alt="logo" style="width:300px;height:300px;"></img>
        </div>
        <div className="flip-logo-back">
          <img src="/logo2.png" alt="logo" style="width:300px;height:300px;"></img>
        </div>
      </div>
    </div>
  )
}

export default Logo
