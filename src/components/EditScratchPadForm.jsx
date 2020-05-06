import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import { editingSavedScratchpad } from '../redux/actions'

const styles = theme => ({
  form: {
    width: '100%',
    },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class EditScratchPadForm extends React.Component {

    constructor(){
        super()
        this.state = {
            name: ""
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.scratchpad.name,
        })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.editingSavedScratchpad({
            id: this.props.scratchpad.id,
            name: this.state.name
            })
        this.props.handleClose()
    }

    render(){
        console.log(this.props)
        const { classes } = this.props
        return(<div>
            <DialogTitle style={{marginBottom: "0px"}}id="edit-scratchpad-title">Edit ScratchPad</DialogTitle>
                <DialogContent>
            <form className={classes.form} onSubmit={this.handleOnSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Document Name"
                    type="name"
                    fullWidth
                    onChange = {this.handleOnChange} 
                    value = {this.state.name}
                />
                <Button
                    variant="contained"
                    fullWidth
                    style={{marginTop:"20px"}}
                    color="primary"
                    size="small"
                    className={classes.button}
                    type="submit"
                    startIcon={<SaveIcon />}
                    >
                    Save
                </Button>
            </form>
            </DialogContent>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editingSavedScratchpad: userInfo => dispatch(editingSavedScratchpad(userInfo))
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(EditScratchPadForm))