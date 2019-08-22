import React from  'react'
import Auth from '../../lib/Auth'
import StarRatings from 'react-star-ratings'


const Comment = ({ user, createdAt, content, _id, handleDeleteComment, rating }) => {
  return (
    <section className="section1 comment">
      <div className="columns comment">

        <div className="column comment is-2">
          <div className="media-left">
            <figure className="image is-48x48">
              <img className="is-rounded" src={user.image} alt="Placeholder image" />
            </figure>
          </div>
        </div>

        <div className="column comment is-9">
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
              <div className="subtitle comment">
                {content}
              </div>
            </div>

          </div>
        </div>

        <div className="column comment is-2">
          <div className="content">
            {Auth.isAuthenticated() && <div className="media-right">
              <button className="delete commnet" id={_id} onClick={handleDeleteComment}></button>
              <br />
              <br />
            </div>}



          </div>
        </div>
      </div>


    </section>
  )
}

export default Comment
