import React from 'react'
import PostShowRepliesBox from './PostShowRepliesBox'
import NewReplyForm from '../components/NewReplyForm'
import PostCard from '../components/PostCard'

const PostShowPage = ({post}) => {
    if (post) {
    return(<div>
        Original Post:
        <PostCard post = {post} />
        <PostShowRepliesBox post = {post}/>
        <NewReplyForm post = {post} />
    </div>)
    } else {
        return null}
}

export default PostShowPage