import React from 'react'
import {connect} from 'react-redux'
import {deletingReply} from '../redux/actions'

const ReplyCard = ({reply, deletingReply}) => {
    return(<div className = "card">
        <h4>{reply.replier.username}:</h4>
        <h3>{reply.reply_text}</h3>
        <button onClick = {handleOnClick}>Delete Reply</button>
        <h4>Upvotes: {reply.upvotes.length}</h4>
        <button>Upvote Icon</button>
    </div>)

    function handleOnClick() {
        deletingReply(reply)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingReply: reply => dispatch(deletingReply(reply))
    }
}

export default connect(null, mapDispatchToProps)(ReplyCard)