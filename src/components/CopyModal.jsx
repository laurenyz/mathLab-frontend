import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';

// const useStyles = makeStyles((theme) => ({
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
  
// }))

const CopyModal = props => {   
        return(<div>
            <DialogTitle style={{marginBottom: "0px"}}id="edit-scratchpad-title">Share ScratchPad</DialogTitle>
                <DialogContent>
                <TextField
                    id="url"
                    autoFocus
                    margin="dense"
                    name="name"
                    label="ScratchPad Link"
                    type="name"
                    fullWidth
                    value = {window.location.href}
                />
                <Button
                    variant="contained"
                    fullWidth
                    style={{marginTop:"20px"}}
                    color="primary"
                    size="small"
                    type="submit"
                    onClick={copy}
                    startIcon={<AssignmentIcon />}
                    >
                    Copy
                </Button>
            </DialogContent>
        </div>)
        
function copy() {
    const copyText = document.getElementById("url");
    copyText.select();
    document.execCommand("copy");
    props.handleCloseShare()
    }
 }


export default CopyModal