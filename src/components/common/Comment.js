import React from  'react'

const Comment = ({ user, createdAt, content, handleDeleteComment, _id }) => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{user.username}</strong>
            {' '}
            <small>{(new Date(createdAt)).toLocaleDateString()}</small>
            <br />
            {content}
          </p>
        </div>
      </div>
      <div className="media-right">
        <button className="delete" id={_id} onClick={handleDeleteComment}></button>
      </div>
    </article>
  )
}

export default Comment
