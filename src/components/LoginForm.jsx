import React from 'react'
import {connect} from 'react-redux'
import {loggingIn} from '../redux/actions'

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
            </div>)
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        loggingIn: info => dispatch(loggingIn(info))
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)