import React from 'react'
import ScratchPad from '../components/ScratchPad'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { savingScratchPad } from '../redux/actions'


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ScratchPadContainer = (props) => {
    const classes = useStyles();
    return(
      <div>
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
          <ScratchPad />
      </div>)

    function handleSaveOnClick(){
        if (props.user){
            if(props.userScratchpads.find(pad => pad.url===props.match.params.url)){
              alert("You've already saved this ScratchPad!")
            }else{
            props.savingScratchPad({user_id: props.user.id, name: props.match.params.url, url: props.match.params.url})
            }
        } else {
            alert("Must be logged in to save scratchpad.")
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        userScratchpads: state.userScratchpads
    }
}

const mapDispatchToProps = dispatch => {
    return{
        savingScratchPad: savedData => dispatch(savingScratchPad(savedData))
    }
}

export default withRouter((connect(mapStateToProps, mapDispatchToProps))(ScratchPadContainer))