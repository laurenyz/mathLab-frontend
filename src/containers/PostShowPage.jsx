import React from 'react'
import PostShowRepliesBox from './PostShowRepliesBox'
import NewReplyForm from '../components/NewReplyForm'
import PostCard from '../components/PostCard'
import {connect} from 'react-redux'
import { makeStyles, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
      paddingTop: 20,
    },
  }));

const PostShowPage = ({post, user}) => {
    const classes = useStyles();
    if (post) {
    return(<div>
        <Grid container>
            <Grid item xs = {2} />
            <Grid item xs={8} > 
                <Typography className={classes.title} >Original Post</Typography>
                <PostCard post = {post} />
                {post.replies.length>0?  <PostShowRepliesBox post = {post}/> : null }
                {user? <NewReplyForm post = {post} />: null }
            </Grid>
            <Grid item xs = {2} />
        </Grid>
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