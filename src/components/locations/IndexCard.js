import React from 'react'
import StarRatings from 'react-star-ratings'





const Card = ({ name, addressCity, addressPostCode, image, dateNum, averageRating }) => {


  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={name} />
        </figure>
      </div>


      <div className="card-content">
        <p className="title is-5">{name}</p>
        <StarRatings
          rating={averageRating}
          starDimension="15px"
          starRatedColor="#FFC300"
          starSpacing="2px"
          numberOfStars={5}
        />
        <br />
        <br />

        <p className="text is-8">Date Number: </p>
        {dateNum.map(date =>
          <div key={location._id} className="text is-8">
             💗 {date }
          </div>
        )}

        <hr/>
        <p className="text is-12">{addressCity}, {addressPostCode}</p>
      </div>
    </div>


  )
}

export default Card
