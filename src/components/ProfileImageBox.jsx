import React from 'react'
import {deleteUser} from '../redux/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { makeStyles, Grid, Card, IconButton, CardHeader, CardContent, CardActions, Collapse, Avatar, CardActionArea, Button, Divider, Typography } from '@material-ui/core';
// import cx from 'clsx';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';

import FavoriteBorderRounded from '@material-ui/icons/FavoriteBorderRounded';
import Share from '@material-ui/icons/Share';



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
    accountTitle: {
        marginTop: "10px",
        marginBototm: "20px"
    },
    upvoteTitle:{
        fontWeight: "bold"
    },
    avatar: {
      width: 200,
      height: 200,
      border: '2px solid #fff',
      margin: '-100px 20px',
      '& > img': {
        margin: 0,
      },
    },
  }));

const ProfileImageBox = (props) => {
  const classes = useStyles();
    return(
    <div>
        
            <CardMedia
                className = {classes.headerImage}
                component="img"
                alt="Contemplative Reptile"
                height="240"
                image = {require(`../assets/images/profile_background.png`)}
                title="Contemplative Reptile"
                />
                <Grid container>
                    <Grid item>
                    <Avatar className={classes.avatar} src={props.profilePicture} />
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" className={classes.accountTitle}>
                            <Grid item >
                            <Typography variant="h2">{props.user.username}</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid item>
                                        <Typography variant = "p">Total Upvotes: </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant = "p" style={{fontWeight: "bold", marginLeft: "4px"}}>{props.userUpvotes}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid>
            
            
          
            {/* <Box px={2} pb={2} mt={-1}>
                <IconButton>
                <Share />
                </IconButton>
                <IconButton>
                <FavoriteBorderRounded />
                </IconButton>
            </Box> */}
            

        <button onClick = {handlePictureEditOnClick}>Edit Profile Picture</button>
        <button onClick = {handleEditOnClick}>Edit Profile</button>
        <button onClick = {handleDeleteOnClick}>Delete Profile</button>
    </div>)
    

    function handlePictureEditOnClick(){
        props.history.push("/profile/image/edit")
    }

    function handleEditOnClick(){
        props.history.push("/profile/edit")
    }

    function handleDeleteOnClick(){
        props.deleteUser(props.user)
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        profilePicture: state.profilePicture
    }
}

export default withRouter(connect(mapStateToProps, {deleteUser})(ProfileImageBox))

