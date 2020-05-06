import React, {useRef} from 'react'
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



const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ScratchPadContainer = (props) => {
  const componentRef = useRef();
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <NewScratchPadForm url={props.match.params.url} handleClose={handleClose} />
          </Dialog>
        {props.userScratchpads.find(pad => pad.url===props.match.params.url)?
         <Button
         variant="contained"
         disabled={true}
         color="primary"
         size="small"
         className={classes.button}
         startIcon={<SaveIcon />}
         onClick = {handleClickOpen}
         >
           Save
         </Button>    
        :
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick = {handleSaveOnClick}
          >
            Save
          </Button> 
      }
     <ReactToPrint
        trigger={() => <Button variant="contained" color="primary" size="small" startIcon={<PrintIcon />}>Print</Button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
          <ScratchPad />
          </div>
      </div>)   

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

export default withRouter((connect(mapStateToProps))(ScratchPadContainer))