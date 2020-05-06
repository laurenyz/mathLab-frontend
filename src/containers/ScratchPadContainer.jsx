import React, {useRef, useState, useEffect} from 'react'
import ScratchPad from '../components/ScratchPad'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import NewScratchPadForm from '../components/NewScratchPadForm'
import ReactToPrint from "react-to-print";
import PrintIcon from '@material-ui/icons/Print';
import TextField from '@material-ui/core/TextField';
import { editingSavedScratchpad } from '../redux/actions'
import Grid from '@material-ui/core/Grid'



const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ScratchPadContainer = (props) => {
  const componentRef = useRef();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [scratchpad, setScratchpad] = useState(null)

    useEffect(() => {
      if(props.userScratchpads.find(pad => pad.url===props.match.params.url)){
        const pad = props.userScratchpads.find(pad => pad.url===props.match.params.url)
        setScratchpad(pad)
        setName(pad.name)
      } 
    }, [props.userScratchpads, props.match.params.url])
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    return(
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <NewScratchPadForm url={props.match.params.url} handleClose={handleClose} />
        </Dialog>
        <Grid container>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Grid container justify="center">
              <Grid container justify="center" alignItems="center" style={{marginTop: "20px"}}>
                <Grid item>
                {scratchpad?
                  <Button variant="contained" disabled={true} color="primary" size="small" className={classes.button} startIcon={<SaveIcon />} onClick = {handleClickOpen}> Save </Button>    
                  :<Button variant="contained" color="primary" size="small" className={classes.button} startIcon={<SaveIcon />} onClick = {handleSaveOnClick}>Save</Button> 
                }
                </Grid>
                <Grid item>
                  <ReactToPrint
                    trigger={() => <Button variant="contained" color="primary" size="small" startIcon={<PrintIcon />}>Print</Button>}
                    content={() => componentRef.current}
                  />
                </Grid>
                <Grid item style={{marginLeft: "10px"}}>
                {scratchpad?
                    <TextField autoFocus variant="outlined" margin="dense" name="name" label="Document Title" type="name" onChange = {handleOnChange} value = {name}/>:null}
                </Grid>
              </Grid>
              <Grid item></Grid>
                <div ref={componentRef}>
                    <ScratchPad />
                </div>
              </Grid>
            </Grid>
            <Grid item xs={3} />
        </Grid>
          
      </div>)   

    function handleOnChange(event){
        // setName(event.target.value)
        props.editingSavedScratchpad({id: scratchpad.id, name: event.target.value})
    }

   function handleSaveOnClick(){
      if (props.user){
          handleClickOpen()
      } else {
          alert("Must be logged in to save scratchpad.")
      }
  }
}


const mapStateToProps = state => {
    return {
        userScratchpads: state.userScratchpads,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
  return {
      editingSavedScratchpad: userInfo => dispatch(editingSavedScratchpad(userInfo))
  }
}

export default withRouter((connect(mapStateToProps, mapDispatchToProps))(ScratchPadContainer))