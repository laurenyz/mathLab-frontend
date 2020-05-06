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
                <Typography variant={"h5"} className={classes.title} >Published Posts</Typography>
                <Grid container direction="column" justify = "center" alignItems="stretch" spacing = {2}>
                    {props.userPosts.map(post => <Grid item key={uuidv4()}><PostCard post={post} key={post.id} showReplies={true}/></Grid>)}
                </Grid>
            </div>
            :
            <Typography className={classes.title} >No Posts Published...</Typography>
        }
            
        </div>)
    }

export default ProfilePostsBox