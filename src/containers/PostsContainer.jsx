import React from 'react'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import SubjectFilter from '../components/SubjectFilter'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'



const PostsContainer = (props) => {
    return(<div>
        <SearchBar />
        <SubjectFilter />
        
        {props.user? <Link to="/posts/new">Add Post+</Link> : null }
        <h1>Posts:</h1>
        <Grid container direction="column" justify = "center" alignItems="stretch" spacing={2} maxWidth = "sm">
            {filterFunction().map(post => <Grid item xs={8}><PostCard post={post} key={post.id}/></Grid>)}
        </Grid>
    </div>)

    function filterFunction(){
        let filteredPosts = 
            (props.posts.filter(post => post.post_text.toLowerCase().includes(props.searchTerm)))
            .filter(post => (props.filterSubject !== "" ? post.subject === props.filterSubject: post))
        return filteredPosts
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        posts: state.posts,
        searchTerm: state.searchTerm,
        filterSubject: state.filterSubject
    }
}

export default withRouter(connect(mapStateToProps)(PostsContainer))


