import React from 'react'
import { makeStyles, Grid, CardContent, Typography, Button } from '@material-ui/core';
import {deleteUser} from '../redux/actions'
import {connect} from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    content: {
      marginTop: "30px",
      paddingLeft: "2em",
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

const ProfileDetailsBox = (props) => {
    const classes = useStyles();
    if (props.user){
    return(<div>
          <CardContent className={classes.content}>
              <Grid container direction="column">
                 <Grid item>
                     <Typography gutterBottom variant="h6">Name: {props.user.name}</Typography>
                     <Typography gutterBottom variant="h6">Email: {props.user.email}</Typography>
                 </Grid>
                    <Grid item style={{marginTop: "30px"}}>
                    <Typography gutterBottom variant="p">Member since {calculateStartMonth()} {getStartYear()} </Typography>
                 </Grid>
              </Grid>
              <Grid container style={{marginTop: "20px", marginRight: "60px"}} spacing={1} justify="flex-end">
              <Grid item>
                <Button variant="contained" color="secondary" onClick = {handleEditOnClick} size="small">Edit Profile</Button>
              </Grid>
              <Grid item>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick = {handleDeleteOnClick} size="small"
                >
                    Delete
                </Button>
              </Grid>
          </Grid>
          </CardContent>
          
    </div>)
    }else{
        return null
    }

    function handleDeleteOnClick(){
        props.deleteUser(props.user)
    }

    function handleEditOnClick(){
        props.history.push("/profile/edit")
    }
    
    function getStartYear(){
        let date = new Date(props.user.created_at)
        return date.getFullYear()
    }

    function calculateStartMonth(){
        let date = new Date(props.user.created_at)
        let monthNum = date.getMonth()
        let month
        switch(monthNum){
            case 0:
                month = "January"
                break
            case 1:
                month = "February"
                break
            case 2:
                month = "March"
                break
            case 3:
                month = "April"
                break
            case 4:
                month = "May"
                break
            case 5:
                month = "June"
                break
            case 6:
                month = "July"
                break
            case 7:
                month = "August"
                break
            case 8:
                month = "September"
                break
            case 9:
                month = "October"
                break
            case 10:
                month = "November"
                break
            case 11:
                month = "December"
                break
            default:
                month = null
        }
        return month 
    }
}



export default connect(null, {deleteUser})(ProfileDetailsBox)