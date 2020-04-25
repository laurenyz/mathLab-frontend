import React from 'react'
import PostDetailsBox from '../components/PostDetailsBox'
import PostShowRepliesBox from './PostShowRepliesBox'
import ReplyForm from '../components/ReplyForm'

const PostShowPage = () => {
    return(<div>
        PostShowPage
        <PostDetailsBox />
        {/* <PostShowRepliesBox /> */}
        <ReplyForm />
    </div>)
}

export default PostShowPage