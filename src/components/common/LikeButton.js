import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'



const LikeButton = ({ liked, handleLike }) => {
  const text = liked ? ' ' : ' '
  const label = liked ? 'Unlike 💔' : ' Like 💗'


  return (
    <div>

      <button
        onClick={handleLike}
        className= "like">
        {label}
        <span>
          <FontAwesomeIcon icon={faThumbsUp} />
        </span>
      </button>
      <p>
        {text}
      </p>
    </div>
  )
}
// 300 people have liked this
export default LikeButton
