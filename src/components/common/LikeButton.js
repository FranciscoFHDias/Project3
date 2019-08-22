import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'



const LikeButton = ({ liked, handleLike }) => {
  const label = liked ? <FontAwesomeIcon className="thumbsDown" icon={faThumbsDown} /> : <FontAwesomeIcon className="thumbsUp" icon={faThumbsUp} />


  return (
    <div>

      <button
        onClick={handleLike}
        className= "like">
        {label}
      </button>
    </div>
  )
}
// 300 people have liked this
export default LikeButton
