import React from 'react'
import PostDetailsBox from '../components/PostDetailsBox'
import PostShowRepliesBox from './PostShowRepliesBox'
import ReplyForm from '../components/ReplyForm'
import PostCard from '../components/PostCard'
import {connect} from 'react-redux'

const PostShowPage = ({post}) => {
    return(<div>
        Original Post:
        <PostCard post = {post} />
        <PostShowRepliesBox post = {post}/>
        <ReplyForm post = {post} />
    </div>)
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(PostShowPage)