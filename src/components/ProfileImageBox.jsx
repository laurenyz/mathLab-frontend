import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { uploadingProfilePicture } from '../redux/actions'
import Input from '@material-ui/core/Input'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CancelIcon from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton'

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
    input: {
        display: 'none',
    }
    }
  }));

const ProfileImageBox = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
                            {open ? 
                            <form onSubmit={handleSubmit}>
                                <Input id="profile-photo-input" type="file" accept="image/png, image/jpeg" name = "image"></Input>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    type="submit"
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload
                                </Button>
                                <IconButton aria-label="delete" onClick = {handleClose}>
                                    <CancelIcon />
                                </IconButton>
                            </form>
                            :<Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AddAPhotoIcon />}
                                onClick = {handleClickOpen} size="small"
                            >
                                Update Photo
                            </Button>    
                        } 
                    </Grid>
                </Grid>
    </div>)
    
    function handleSubmit(event) {
        event.preventDefault()
        
        const formData = new FormData(event.target)
        if (formData.get("image").name !== "") {
            props.uploadingProfilePicture(formData, props.user.id) 
            handleClose()
        } else {
            alert("Please select a photo")
        }
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        profilePicture: state.profilePicture
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadingProfilePicture: (formData, userId) => dispatch(uploadingProfilePicture(formData, userId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileImageBox))