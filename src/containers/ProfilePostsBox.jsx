import React from 'react'
import PostCard from '../components/PostCard'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    title: {
      paddingTop: 20,
    },
  }));

const ProfilePostsBox = (props) => {
    const classes = useStyles();
    return(
        <div>
            {props.userPosts.length>0? 
            <div>
                <Typography className={classes.title} >My Posts</Typography>
                <Grid container direction="column" justify = "center" alignItems="stretch" spacing = {2}>
                    {props.userPosts.map(post => <Grid item key={uuidv4()}><PostCard post={post} key={post.id} showReplies={true}/></Grid>)}
                </Grid>
            </div>
            :
            null
        }
            
        </div>)
    }

export default ProfilePostsBox