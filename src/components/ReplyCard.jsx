import React from 'react'
import {connect} from 'react-redux'
import {deletingReply, addingUpvote} from '../redux/actions'

const ReplyCard = ({reply, deletingReply, user, addingUpvote}) => {
    return(<div className = "card">
        <h4>{reply.replier.username}:</h4>
        <h3>{reply.reply_text}</h3>
        {(user.id === reply.replier.id? <button onClick = {handleOnClick}>Delete Reply</button>: null)}
        <h4>Upvotes: {reply.upvotes.length}</h4>
        <button onClick = {handleOnClickUpvote}>Upvote Icon</button>
    </div>)

    function handleOnClickUpvote(){
        if(user.id === reply.replier.id){
            alert("Hold on there partner, you can't upvote your own reply!")
        } 
        // else if(reply.upvotes.find(upvote => upvote.voter_id === user.id)) {
        //     alert("Woah there, you've already liked this reply!")
        // }
         else {
        console.log("upvoting!")
        addingUpvote({reply_id: reply.id, voter_id: user.id})
        }
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