import React from 'react'
import { connect } from 'react-redux'
import { logoutUser, updateFilterSubject, updateSearchTerm } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});


class Navbar extends React.Component {

    handleOnClickLogin = () => {
        this.props.history.push("/login")
    }

    handleOnClickCalculator = () => {
        this.props.history.push("/calculator")
    }

    handleOnClickMyAccount = () => {
        this.props.history.push("/profile")
    }

    handleOnClickMathLab = () => {
        this.props.history.push("/")
    }

    handleOnClickLogout = () => {
        this.props.history.push("/")
        this.props.logoutUser()
    }
    
    handleOnClickConnect = () => {
        this.props.history.push("/posts")
        this.props.updateFilterSubject("")
        this.props.updateSearchTerm("")
    }
    
    handleOnClickScratchPad = () => {
            fetch("http://localhost:3000/scratchpads", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({scratchpad_text: "", url: Date.now().toString()})
            })
            .then(resp => resp.json())
            .then(scratchpad => {
                if (scratchpad.error){
                    alert(scratchpad.message)
                    } else {
                    console.log(scratchpad)
                    window.open(`/scratchpads/${scratchpad.url}`)
                    }
            })
    }
          
    render() {
        const { classes } = this.props
        return(
            <div className={classes.root}>
                <AppBar position="static" > 
                    <Toolbar>
                        <Button onClick = {this.handleOnClickMathLab} color="inherit">ma+hLab</Button>
                        <Button onClick = {this.handleOnClickScratchPad} color="inherit">ScratchPad</Button>
                        <Button onClick = {this.handleOnClickCalculator} color="inherit">Calculator</Button>
                        <Button onClick = {this.handleOnClickConnect} color="inherit">Connect()</Button>
                        {this.props.user? <Button onClick = {this.handleOnClickMyAccount} color="inherit">MyAccount</Button>: null}
                        {this.props.user? <Button onClick = {this.handleOnClickLogout} color="inherit">Logout</Button> : 
                            <Button onClick = {this.handleOnClickLogin} color="inherit">Login</Button> }
                    </Toolbar>
                </AppBar>
            </div>
        )}
    }
    
    const mapStateToProps = state => {
        return {
            user: state.user
        }
    }
    
    export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps,{logoutUser, updateFilterSubject, updateSearchTerm})(Navbar)))
    