import React from 'react'
import ReplyCard from '../components/ReplyCard'

const PostShowRepliesBox = ({post}) => {
    if (post){
    return(<div>
        Replies:
        {post.replies.map(reply => <ReplyCard post = {post} reply = {reply} key = {reply.id}/>)}
    </div>)
    } else{
        return null
    }
}

export default PostShowRepliesBox