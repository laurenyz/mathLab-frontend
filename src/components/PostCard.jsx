import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {deletingPost} from '../redux/actions'

const PostCard = (props) => {
    const {post, deletingPost, user, history} = props
    return(
    <div className = "card" onClick = {handleOnClick}>
        <h4>{post.user.username}:</h4>
        <h4>Replies: {post.replies.length}</h4>
        <h3>{post.post_text}</h3>
        {post.tags.length !==0 ? <h5>#{post.tags[0].tagline}</h5>: null}
        {(user && user.id === post.user.id?<button onClick = {handleDeleteOnClick}>Delete Post</button>: null)}
        
    </div>)

    function handleOnClick(){
        history.push(`/posts/${post.id}`)
    }

    function handleDeleteOnClick(){
        deletingPost(post)
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingPost: post => dispatch(deletingPost(post))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))