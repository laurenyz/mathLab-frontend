import React from 'react'
import PostCard from '../components/PostCard'
import NewPostForm from '../components/NewPostForm'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'



const PostsContainer = (props) => {

   
    return(<div>
        {props.user? <Link to="/posts/new">Add Post+</Link> : null }
        <h1>Posts:</h1>
        {props.posts.map(post => <PostCard post={post} key={post.id}/>)}
    </div>)
}

const mapStateToProps = state => {
    return {
        user: state.user,
        posts: state.posts
    }
}

export default withRouter(connect(mapStateToProps)(PostsContainer))


