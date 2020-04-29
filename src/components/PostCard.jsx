import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {deletingPost} from '../redux/actions'

const PostCard = (props) => {
    const {post, deletingPost, user, history} = props
    return(
    <div className = "card" onClick = {handleOnClick}>
        <h4>{post.user.username}:</h4>
        <h5>{getCreatedDate()} {getCreatedTime()}</h5>
        <h4>Replies: {post.replies.length}</h4>
        <h3>{post.post_text}</h3>
        {post.tags.length !==0 ? <h5>#{post.tags[0].tagline}</h5>: null}
        <div>{post.subject}</div>
        {(user && user.id === post.user.id?<button onClick = {handleDeleteOnClick}>Delete Post</button>: null)}
        
    </div>)

function getCreatedTime() {
    let date = new Date(post.created_at)
    let hour = date.getHours() 
    let minutes = date.getMinutes() 
    let timeOfDay
        if (hour>11){
            timeOfDay = "PM"
            if(hour > 12){
                hour -= 12
            }
        } else if (hour === 0) {
            timeOfDay = "AM"
            hour = 12
        } else {
            timeOfDay = "AM"
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
          }

        return `${hour}:${minutes} ${timeOfDay}`
    }

    function getCreatedDate() {
        let date = new Date(post.created_at)
        let month = date.getMonth()+1
        let day = date.getDate()
        let year = date.getFullYear()
        return `${month}/${day}/${year}`

    }

    function handleOnClick(){
        history.push(`/posts/${post.id}`)
    }

    function handleDeleteOnClick(){
        deletingPost({post: post, history: history})
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingPost: info => dispatch(deletingPost(info))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))