import React from 'react'
import { connect } from 'react-redux'
import { editingUser } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
    },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class EditUserForm extends React.Component {

    constructor(){
        super()
        this.state = {
            name: "",
            username: "",
            email: ""
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name,
            username: this.props.user.username,
            email: this.props.user.email
        })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.editingUser({
            id: this.props.user.id,
            name: this.state.name, 
            email: this.state.email, 
            username: this.state.username, 
            history: this.props.history
            })
        this.setState({
            name: "",
            username: "",
            email: ""
        })
    }

    render(){
        const { classes } = this.props
        return(<div>
            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={this.handleOnSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="name"
            fullWidth
            onChange = {this.handleOnChange} 
            value = {this.state.name}
          />
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="username"
            fullWidth
            onChange = {this.handleOnChange} 
            value = {this.state.username}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            onChange = {this.handleOnChange} 
            value = {this.state.email}
          />
          <Button
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             className={classes.submit}
           >
             Update Profile
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
        editingUser: userInfo => dispatch(editingUser(userInfo))
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUserForm)))