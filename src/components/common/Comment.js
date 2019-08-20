import React from  'react'
import Auth from '../../lib/Auth'
import StarRatings from 'react-star-ratings'

import LikeButton from '../common/LikeButton'

const Comment = ({ user, createdAt, content, _id, handleDeleteComment, rating }) => {
  return (
    <section className="section">
      <div className="columns">

        <div className="column is-2">
          <div className="media-left">
            <figure className="image is-48x48">
              <img className="is-rounded" src={user.image} alt="Placeholder image" />
            </figure>
          </div>
        </div>

        <div className="column is-9">
          <div className="content">
            <strong className="title is-4">{user.username}</strong>
            <br />

            <StarRatings
              rating={rating}
              starRatedColor="#FFC300"
              numberOfStars={5}
              starDimension="10px"
              starSpacing="2px"
              name="commentRating"
            />
            <div>

              {' '}
              <small>{(new Date(createdAt)).toLocaleDateString()}</small>
              <br/>
              <div className="subtitle">
                {content}
              </div>
            </div>

          </div>
        </div>

        <div className="column is-2">
          <div className="content">
            {Auth.isAuthenticated() && <div className="media-right">
              <button className="delete" id={_id} onClick={handleDeleteComment}></button>
              <br />
              <br />
              <LikeButton />
            </div>}



          </div>
        </div>
      </div>


    </section>
  )
}

export default Comment
