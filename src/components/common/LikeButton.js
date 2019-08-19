import React from 'react'

const LikeButton = ({ liked, handleLike }) => {
  const text = liked ? ' ' : ''
  const label = liked ? 'Unlike 💔' : ' Like 💗'

  return (
    <div>

      <button
        onClick={handleLike}
        className= " button is-info">
        {label}
        <span>
          <i className="far fa-thumbs-up"></i>
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
