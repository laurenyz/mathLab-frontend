import React from 'react'
import { connect } from 'react-redux'
import { loggingIn } from '../redux/actions'
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
    marginTop: theme.spacing(4),
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

class LoginForm extends React.Component {

    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    handleOnChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnSubmit = (event) =>{
        event.preventDefault()
        this.props.loggingIn({email: this.state.email, password: this.state.password, handleClose: this.props.handleClose})
        this.setState({
          // email: "", 
          password: ""})
    }

    render(){
        const { classes } = this.props
        return(
            <div>
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar} alt="mathlab logo" src={require(`../assets/images/mathlab_logo.png`)}/>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <form className={classes.form} onSubmit = {this.handleOnSubmit}>
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
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item style={{marginBottom: "20px"}}>
                          <Typography style={{cursor: "pointer"}} onClick={this.props.handleNewUserClickOpen}>
                          Don't have an account? Sign Up
                            </Typography> 
                           
                        </Grid>
                      </Grid>
                    </form>
                  </div>
              </Container> 
            </div>)
      }   
}

const mapDispatchToProps = dispatch => {
    return {
        loggingIn: info => dispatch(loggingIn(info))
    }
}

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(LoginForm))


          