import React from 'react'

const Card = ({ image, username, age, gender, smoker }) => {
  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-128x128 is-4by3">
          <img className="is-rounded" src={image} alt={username} />
        </figure>
      </div>


      <div className="card-content">

        <div className="columns is-multiline">

          <div className="column">
            <p className="title is-5">{username}</p>
          </div>

        </div>

        <p className="text is-8">Age:  {age}</p>
        <hr/>
        <p className="text is-8">Gender:  {gender}</p>
        <hr/>
        <p className="text is-8">Smoker:  {smoker}</p>

      </div>

    </div>
  )
}

export default Card
