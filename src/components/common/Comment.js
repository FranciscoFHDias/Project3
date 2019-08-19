import React from  'react'
import Auth from '../../lib/Auth'
import StarRatings from 'react-star-ratings'

const Comment = ({ user, createdAt, content, _id, handleDeleteComment, rating }) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <StarRatings
            rating={rating}
            starRatedColor="#FFC300"
            numberOfStars={5}
            starDimension="10px"
            starSpacing="2px"
            name="commentRating"
          />
          <p>
            <strong>{user.username}</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <br/>
            {content}
          </p>
        </div>
      </div>
      {Auth.isAuthenticated() && <div className="media-right">
        <button className="delete" id={_id} onClick={handleDeleteComment}></button>
      </div>}
    </article>
  )
}

export default Comment
