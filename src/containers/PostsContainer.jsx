import React from 'react'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import SubjectFilter from '../components/SubjectFilter'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid'

const PostsContainer = (props) => {

    return(<div>
        <Grid container>
            <Grid item xs = {2} />
            <Grid item xs={8}>
                {( props.user? 
                <Grid container>
                    <Grid item>
                        <Button onClick = {handleAddPostOnClick}>
                            Add Post +
                        </Button>
                    </Grid>
                </Grid>
                : null
                )}
                 <Grid container>
                    <Grid item><SearchBar /></Grid>
                    <Grid item><SubjectFilter /></Grid>
                </Grid>
                <Grid container direction="column" justify = "center" alignItems="stretch" spacing = {2}>
                    {filterFunction().map(post => <Grid item key={uuidv4()}><PostCard post={post} key={post.id} /></Grid>)}
                </Grid>
            </Grid>
            
            <Grid item xs = {2}/>
        </Grid>
    </div>)

    function handleAddPostOnClick(){
        props.history.push('/posts/new')
    }

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