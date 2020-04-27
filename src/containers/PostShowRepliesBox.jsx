import React from 'react'
import ReplyCard from '../components/ReplyCard'

const PostShowRepliesBox = ({post}) => {
    if (post){
    return(<div>
        {post.replies.length>0? <h2>Replies:</h2> : null }
        {post.replies.map(reply => <ReplyCard post = {post} reply = {reply} key = {reply.id}/>)}
    </div>)
    } else{
        return null
    }
}

export default PostShowRepliesBox