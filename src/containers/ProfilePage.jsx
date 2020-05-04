import React from 'react'
import ProfileImageBox from '../components/ProfileImageBox'
import ProfileDetailsBox from '../components/ProfileDetailsBox'
import ProfilePostsBox from './ProfilePostsBox'
import {connect} from 'react-redux'
import { makeStyles, Grid, Card } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
      marginTop: 20,
      minWidth: 300,
    //   margin: 'auto',
    },
    content: {
      padding: 24,
    },
    headerImage: {
        background: "#efd3dd"
    },
    avatar: {
      width: 200,
      height: 200,
      border: '2px solid #fff',
      margin: '-100px 625px 0 auto',
      '& > img': {
        margin: 0,
      },
    },
  }));

const ProfilePage = (props) => {
    const classes = useStyles();
    if(props.user){
    return(
        <div>
            <Grid container>
            <Grid item xs = {2} />
            <Grid item xs={8} > 
                <Grid container direction="column" justify = "center" alignItems="stretch" spacing = {2}>
                    
                <Card className={classes.root}>
                        <ProfileImageBox userUpvotes = {props.userUpvotes}/>
                        <ProfileDetailsBox user = {props.user} />
                </Card>
                        <ProfilePostsBox userPosts = {props.posts.filter(post => post.user.id === props.user.id)}/>
                
                </Grid>

            </Grid>
            <Grid item xs = {2} />
            </Grid>
        </div>)} else {
        return null
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        user: state.user,
        userUpvotes: state.userUpvotes
    }
}

export default connect(mapStateToProps)(ProfilePage)