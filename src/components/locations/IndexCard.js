import React from 'react'

const Card = ({ name, address, image }) => {

  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>


      <div className="card-content">

        <div>
          <p className="title is-4">{name}</p>
          <br/>
          <p className="subtitle is-6">Rating</p>
          <p className="subtitle is-6">Date no.</p>
          <hr/>
          <p className="text is-8">{address}</p>
        </div>

      </div>

    </div>
  )
}

export default Card
