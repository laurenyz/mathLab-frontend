import React from 'react'
import { connect } from 'react-redux'
import { deletingReply, addingUpvote, deletingUpvote } from '../redux/actions'
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import HUE from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 300
    },
    deleteBtn: {
      marginLeft: 'auto'
    },
  }));

const ScratchPadCard = (props) => {
    const classes = useStyles();
    console.log (props)
    return( 
        <div>
            <Card>
                <CardActionArea onClick={handleScratchpadOnClick}>
                    <Grid container alignItems="center" style={{padding: "10px"}}>
                        <Grid item>
                        <Typography>{props.scratchpad.name}.pad</Typography>
                        </Grid>
                        <Grid item>
                        <IconButton className={classes.deleteBtn} aria-label="delete" onClick = {handleDeleteOnClick}>
                        <DeleteIcon />
                    </IconButton>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
            
        </div>
            
   
    )

function handleScratchpadOnClick() {
    window.open(`/scratchpads/${props.scratchpad.url}`)
}

function handleDeleteOnClick() {
    console.log("need to delete scratchpad")
    }
}

const mapStateToProps = state => {
    return{
      
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScratchPadCard)