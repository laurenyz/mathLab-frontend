import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { makeStyles, Grid, Avatar, Button, Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles(() => ({
    root: {
      marginTop: 20,
      minWidth: 400,
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
                alt="Equation Background"
                height="240"
                image = {require(`../assets/images/profile_background.png`)}
                title="Equation Background"
                />
                <Grid container direction="column">
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
                                            <Typography variant = "subtitle1">Total Upvotes: </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant = "subtitle1" style={{fontWeight: "bold", marginLeft: "4px"}}>{props.userUpvotes}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> 
                    </Grid>   
                    <Grid item style={{marginLeft:"45px", marginTop:"20px"}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AddAPhotoIcon />}
                                onClick = {handlePictureEditOnClick} size="small"
                            >
                                Update Photo
                            </Button>     
                    </Grid>
                </Grid>
    </div>)
    

    function handlePictureEditOnClick(){
        props.history.push("/profile/image/edit")
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        profilePicture: state.profilePicture
    }
}

export default withRouter(connect(mapStateToProps)(ProfileImageBox))