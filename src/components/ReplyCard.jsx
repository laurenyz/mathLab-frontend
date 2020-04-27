import React from 'react'
import {connect} from 'react-redux'
import {deletingReply} from '../redux/actions'

const ReplyCard = ({reply, deletingReply}) => {
    return(<div className = "card">
        <h3>{reply.reply_text}</h3>
        <button onClick = {handleOnClick}>Delete Reply</button>
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