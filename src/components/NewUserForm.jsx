import React from 'react'
import {createUser} from '../redux/actions'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',     
      flexDirection: 'column',
      alignItems: 'center',
      },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
      },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class NewUserForm extends React.Component{

    constructor(){
        super()
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.createUser({name: this.state.name, 
            email: this.state.email, 
            username: this.state.username, 
            password: this.state.password, 
            password_confirmation: this.state.passwordConfirmation,
            handleNewUserClose: this.props.handleNewUserClose
        })
        this.setState({
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        })
    }
    render(){
        const { classes } = this.props
        return(<div>
            <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar} alt="mathlab logo" src={require(`../assets/images/mathlab_logo.png`)}/>
                    <Typography component="h1" variant="h5">
                        Create an Account
                    </Typography>
                    <form className={classes.form} onSubmit = {this.handleOnSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            type = "text" 
                            onChange = {this.handleOnChange} 
                            value = {this.state.name}
                        />
                       <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            type = "text" 
                            onChange = {this.handleOnChange} 
                            value = {this.state.username}
                        />
                       <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type = "text" 
                        onChange = {this.handleOnChange} 
                        value = {this.state.email}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange = {this.handleOnChange} 
                        value = {this.state.password}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirmation"
                        label="Re-enter Password"
                        type="password"
                        id="passwordConfirmation"
                        autoComplete="current-password"
                        onChange = {this.handleOnChange} 
                        value = {this.state.passwordConfirmation}
                      />
                      <Button
                        style={{marginBottom: "20px"}}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Register
                      </Button>
                    </form>
                  </div>
              </Container> 
        </div>)
    }
}

export default withStyles(styles, { withTheme: true })(connect(null, {createUser})(NewUserForm))