import React from 'react'

const PostCard = (props) => {
    return(<div>
        <h2>Post:</h2>
        <h3>{props.post.post_text}</h3>
    </div>)
}

export default PostCard