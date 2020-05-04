import React from 'react'
import { connect } from 'react-redux'
import { logoutUser, updateFilterSubject, updateSearchTerm } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from '../components/LoginForm'

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

    constructor(){
        super()
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
      };

    handleOnClickLogout = () => {
        this.props.logoutUser()
    }
    
    handleOnClickConnect = () => {
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
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <LoginForm handleClose={this.handleClose}/>
                </Dialog>
                <AppBar position="static" > 
                    <Toolbar>
                        <Button href="/" color="inherit">ma+hLab</Button>
                        <Button onClick={this.handleOnClickScratchPad} color="inherit">ScratchPad</Button>
                        <Button href="/calculator" color="inherit">Calculator</Button>
                        <Button href="/posts" onClick = {this.handleOnClickConnect} color="inherit">Connect()</Button>
                        {this.props.user? <Button href="/profile" color="inherit">MyAccount</Button>: null}
                        {this.props.user? <Button href="/" onClick = {this.handleOnClickLogout} color="inherit">Logout</Button> : 
                            <Button onClick={this.handleClickOpen} color="inherit">Login</Button> }
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
    