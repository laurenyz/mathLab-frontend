import React from 'react'
import PostCard from '../components/PostCard'
import NewPostForm from '../components/NewPostForm'
import {connect} from 'react-redux'


const PostsContainer = (props) => {

    function handleOnClickAddPost() {
        window.location = 'http://localhost:3001/posts/new'
    }
    return(<div>
        <button onClick = {handleOnClickAddPost}>Add Post</button>
        <h1>Posts:</h1>
        {props.posts.map(post => <PostCard post={post} key={post.id}/>)}
    </div>)
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(PostsContainer)


