import React from 'react'
import ScratchPadCard from '../components/ScratchPadCard'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    title: {
      paddingTop: 20,
    },
  }));

const ProfileScratchPadsBox = (props) => {
    const classes = useStyles();
    return(
        <div>
            {props.userScratchpads.length>0? 
            <div>
                <Typography className={classes.title} >Saved ScrachPads</Typography>
                <Grid container direction="column" justify = "center" alignItems="stretch" spacing = {2}>
                    {props.userScratchpads.map(scratchpad => <Grid item key={uuidv4()}><ScratchPadCard scratchpad={scratchpad} key={scratchpad.id}/></Grid>)}
                </Grid>
            </div>
            :
            <Typography className={classes.title} >No Saved ScrachPads...</Typography>
        }
            
        </div>)
    }

export default ProfileScratchPadsBox