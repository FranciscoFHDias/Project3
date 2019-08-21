import React from 'react'
import StarRatings from 'react-star-ratings'





const Card = ({ name, addressPostCode, image, dateNum, averageRating }) => {


  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>


      <div className="card-content">

        <div className="columns is-multiline">

          <div className="column">
            <p className="title is-5">{name}</p>
          </div>

          <div className="column">
            <StarRatings
              rating={averageRating}
              starDimension="15px"
              starRatedColor="#FFC300"
              starSpacing="2px"
              numberOfStars={5}
            />
          </div>
        </div>

        <p className="text is-8">Date Number: </p>
        {dateNum.map(date =>
          <span key={location._id} className="text is-8">
            {date }  {'    '}
          </span>
        )}




        <hr/>
        <p className="text is-12">{addressPostCode}</p>

      </div>

    </div>
  )
}

export default Card
