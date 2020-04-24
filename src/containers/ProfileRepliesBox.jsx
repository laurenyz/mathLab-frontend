import React from 'react'
import ReplyCard from '../components/ReplyCard'

const ProfileRepliesBox = (props) => {
    return(<div>
        <h1>Replies:</h1>
        {props.userReplies.map(reply => <ReplyCard reply={reply} key={reply.id}/>)}
    </div>)
}

export default ProfileRepliesBox