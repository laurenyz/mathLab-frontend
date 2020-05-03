import React from 'react'
import ReplyCard from '../components/ReplyCard'
import { Grid, Divider, Typography, makeStyles } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme) => ({
    title: {
      paddingTop: 20
    },
  }));

const PostShowRepliesBox = ({post}) => {
    const classes = useStyles();
    if (post){
    return(
        <div>
            <Grid item className={classes.title}><Divider/></Grid>
            <Grid item className={classes.title}><Typography>Replies</Typography></Grid>
            <Grid container direction="column" justify = "center" alignItems="stretch" spacing = {2} >
                {arrangeRepliesByUpvotes().map(reply => <Grid item key={uuidv4()} ><ReplyCard post={post} reply={reply} key={reply.id}/></Grid>)}
            </Grid>
        </div>
   )
    } else{
        return null
    }

    function arrangeRepliesByUpvotes(){
        return post.replies.sort((a,b) =>(a.upvotes>b.upvotes? -1 : b.upvtes>a.upvotes? 1: 0))
    }
}

export default PostShowRepliesBox