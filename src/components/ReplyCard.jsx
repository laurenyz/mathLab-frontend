import React from 'react'
import {connect} from 'react-redux'
import {deletingReply, addingUpvote} from '../redux/actions'

const ReplyCard = ({reply, deletingReply, user, addingUpvote}) => {
    return(<div className = "card">
        <h4>{reply.replier.username}:</h4>
        <h5>{getCreatedDate()} {getCreatedTime()}</h5>
        <h3>{reply.reply_text}</h3>
        {(user && user.id === reply.replier.id? <button onClick = {handleOnClick}>Delete Reply</button>: null)}
        <h4>Upvotes: {reply.upvotes.length}</h4>
        <button onClick = {handleOnClickUpvote}>Upvote Icon</button>
    </div>)

    function handleOnClickUpvote(){
        if (user){
            if(user.id === reply.replier.id){
                alert("Hold on there partner, you can't upvote your own reply!")
            } 
            else if(reply.upvotes.find(upvote => upvote.voter_id === user.id)) {
                alert("Woah there, you've already liked this reply!")
            }
             else {
            addingUpvote({reply_id: reply.id, voter_id: user.id})
            }
        } else {
            alert("You must be signed in to upvote a reply!")
        }
        
    }

    function getCreatedTime() {
    let date = new Date(reply.created_at)
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
        let date = new Date(reply.created_at)
        let month = date.getMonth()+1
        let day = date.getDate()
        let year = date.getFullYear()
        return `${month}/${day}/${year}`

    }

    function handleOnClick() {
        deletingReply(reply)
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingReply: reply => dispatch(deletingReply(reply)),
        addingUpvote: upvote => dispatch(addingUpvote(upvote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyCard)