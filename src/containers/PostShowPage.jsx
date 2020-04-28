import React from 'react'
import PostShowRepliesBox from './PostShowRepliesBox'
import NewReplyForm from '../components/NewReplyForm'
import PostCard from '../components/PostCard'
import {connect} from 'react-redux'

const PostShowPage = ({post, user}) => {
    if (post) {
    return(<div>
        Original Post:
        <PostCard post = {post} />
        <PostShowRepliesBox post = {post}/>
        {user? <NewReplyForm post = {post} />: null }
    </div>)
    } else {
        return null}
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PostShowPage)