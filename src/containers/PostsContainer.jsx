import React from 'react'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'



const PostsContainer = (props) => {

    return(<div>
        <SearchBar />
        {props.user? <Link to="/posts/new">Add Post+</Link> : null }
        <h1>Posts:</h1>
        {props.posts.filter(post => post.post_text.toLowerCase().includes(props.searchTerm)).map(post => <PostCard post={post} key={post.id}/>)}
    </div>)
}

const mapStateToProps = state => {
    return {
        user: state.user,
        posts: state.posts,
        searchTerm: state.searchTerm
    }
}

export default withRouter(connect(mapStateToProps)(PostsContainer))


