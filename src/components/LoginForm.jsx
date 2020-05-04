import React from 'react'
import { connect } from 'react-redux'
import { loggingIn } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
        this.props.loggingIn({email: this.state.email, password: this.state.password})
        this.setState({email: "", password: ""})
    }

    render(){
        const { classes } = this.props
        return(



            <div>


<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
               <Link href="#" variant="body2">
                 Forgot password?
               </Link>
             </Grid>
             <Grid item>
               <Link href="#" variant="body2">
                 {"Don't have an account? Sign Up"}
               </Link>
             </Grid>
           </Grid>
         </form>
       </div>
     </Container> 
                <h1>ma+hLab</h1>
                <form onSubmit = {this.handleOnSubmit}>
                    <input name = "email" type = "text" placeholder = "Email..." onChange = {this.handleOnChange} value = {this.state.email}></input>
                    <input name = "password" type = "password" placeholder = "Password..." onChange = {this.handleOnChange} value = {this.state.password}></input>
                    <input type = "submit"></input>
                </form>
                <br></br>
                <Link to="/users/new">Sign up for a mat+hLab account</Link>
            </div>)
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        loggingIn: info => dispatch(loggingIn(info))
    }
}

export default  withStyles(styles, { withTheme: true })(withRouter(connect(null, mapDispatchToProps)(LoginForm)))


          