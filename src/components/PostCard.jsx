import React from 'react'
import {withRouter} from 'react-router-dom'

const PostCard = (props) => {
    const post = props.post
    return(
    <div className = "card" onClick = {handleOnClick}>
        <h4>{post.user.username}:</h4>
        <h4>Replies: {post.replies.length}</h4>
        <h3>{post.post_text}</h3>
        {post.tags.length !==0 ? <h5>#{post.tags[0].tagline}</h5>: null}
    </div>)

function handleOnClick(){
    props.history.push(`/posts/${post.id}`)
}

}


export default withRouter(PostCard)