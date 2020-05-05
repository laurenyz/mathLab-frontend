import React from 'react'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import SubjectFilter from '../components/SubjectFilter'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { v4 as uuidv4 } from 'uuid'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    addButton: {
        paddingTop: 20
    },
  }));

const PostsContainer = (props) => {
    const classes = useStyles();
    return(<div>
        <Grid container style={{marginBottom: "200px"}}>
            <Grid item xs = {2} />
            <Grid item xs={8}>
                {( props.user? 
                <Grid container className={classes.addButton} justify="flex-end" >
                    <Grid item >
                    <Tooltip title="Add Post">
                        <IconButton aria-label="add post" onClick = {handleAddPostOnClick}>
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    </Grid>
                </Grid>
                : null
                )}
                 <Grid container justify="space-between" alignItems="flex-end">
                    <Grid item><SearchBar /></Grid>
                    <Grid item><SubjectFilter /></Grid>
                </Grid>
                <Grid container direction="column" justify = "center" alignItems="stretch" spacing = {2}>
                    {filterFunction().map(post => <Grid item key={uuidv4()}><PostCard post={post} key={post.id} showReplies={true} /></Grid>)}
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