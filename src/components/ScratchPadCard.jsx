import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'
import CloseIcon from '@material-ui/icons/Close';
import {deletingSavedScratchPad} from '../redux/actions'
import EditIcon from '@material-ui/icons/Edit';
// import EditScratchPadForm from '../components/EditScratchPadForm'
// import Dialog from '@material-ui/core/Dialog';


const useStyles = makeStyles((theme) => ({
    // root: {
    //   minWidth: 300
    // },
    // deleteBtn: {
    //   marginLeft: 'auto'
    // },
  }));

const ScratchPadCard = (props) => {
      const classes = useStyles();
    //   const [open, setOpen] = React.useState(false);
    
    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };
    
    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    return( 
        <div>
             {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <EditScratchPadForm scratchpad={props.scratchpad} handleClose={handleClose} />
            </Dialog> */}
            <Card style={{backgroundColor: "#efd3dd"}}>
            <Grid container alignItems="center" justify="space-between" style={{padding: "10px"}}>
            <Grid item>
                <CardActionArea onClick={handleScratchpadOnClick}>        
                    <Typography>{props.scratchpad.name}.pad</Typography> 
                </CardActionArea>
                </Grid>
                <Grid item>
                <CardActions style={{padding: "0px"}}>
                    <IconButton className={classes.deleteBtn} aria-label="delete" onClick = {handleEditOnClick}>
                        <EditIcon />
                    </IconButton>  
                    <IconButton className={classes.deleteBtn} aria-label="delete" onClick = {handleDeleteOnClick}>
                        <CloseIcon />
                    </IconButton>  
                </CardActions>
                </Grid>
                </Grid>
            </Card> 
        </div>
    )

function handleEditOnClick() {
    window.open(`/scratchpads/${props.scratchpad.url}`)
}

function handleScratchpadOnClick() {
    window.open(`/scratchpads/${props.scratchpad.url}`)
}

function handleDeleteOnClick() {
    props.deletingSavedScratchPad(props.scratchpad)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingSavedScratchPad: user_scratchpad => dispatch(deletingSavedScratchPad(user_scratchpad))
    }
}

export default connect(null, mapDispatchToProps)(ScratchPadCard)