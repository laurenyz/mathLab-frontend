import React from 'react'
import {connect} from 'react-redux'
import {loggingIn} from '../redux/actions'
import { Link, withRouter } from 'react-router-dom'

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
        return(
            <div>
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

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))

{/* <Container component="main" maxWidth="xs">
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //       >
    //         Sign In
    //       </Button>
    //       <Grid container>
    //         <Grid item xs>
    //           <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //         <Grid item>
    //           <Link href="#" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </div>
    // </Container> */}