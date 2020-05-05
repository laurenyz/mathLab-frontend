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
            <Typography>{props.scratchpad.name}</Typography>
            <IconButton className={classes.deleteBtn} aria-label="delete" onClick = {handleDeleteOnClick}>
                <DeleteIcon />
            </IconButton>
            </Card>
            
        </div>
            
   
    )



function handleDeleteOnClick() {
       
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