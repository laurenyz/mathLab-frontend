import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {deletingPost} from '../redux/actions'

const PostCard = (props) => {
    const {post, deletingPost} = props
    return(
    <div className = "card" onClick = {handleOnClick}>
        <h4>{post.user.username}:</h4>
        <h4>Replies: {post.replies.length}</h4>
        <h3>{post.post_text}</h3>
        {post.tags.length !==0 ? <h5>#{post.tags[0].tagline}</h5>: null}
        <button onClick = {handleDeleteOnClick}>Delete Post</button>
    </div>)

    function handleOnClick(){
        props.history.push(`/posts/${post.id}`)
    }

    function handleDeleteOnClick(){
        console.log("deleting post")
        deletingPost(post)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingPost: post => dispatch(deletingPost(post))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PostCard))