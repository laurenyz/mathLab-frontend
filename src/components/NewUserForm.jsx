import React from 'react'
import {createUser} from '../redux/actions'
import {connect} from 'react-redux'

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
            password_confirmation: this.state.passwordConfirmation})
        this.setState({
            name: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        })
    }
    render(){
        return(<div>
            <h1>ma+hLab</h1>
                    <form onSubmit = {this.handleOnSubmit}>
                        <label>Name:</label>
                        <input name = "name" type = "text" onChange = {this.handleOnChange} value = {this.state.name}></input>
                        <label>Username:</label>
                        <input name = "username" type = "text" onChange = {this.handleOnChange} value = {this.state.username}></input>
                        <label>Email:</label>
                        <input name = "email" type = "text" onChange = {this.handleOnChange} value = {this.state.email}></input>
                        <label>Password:</label>
                        <input name = "password" type = "password" onChange = {this.handleOnChange} value = {this.state.password}></input>
                        <label>Re-enter Password:</label>
                        <input name = "passwordConfirmation" type = "password" onChange = {this.handleOnChange} value = {this.state.passwordConfirmation}></input>
                        <input type = "submit" value = "Create Account"></input>
                    </form>
        </div>)
    }
}

export default connect(null, {createUser})(NewUserForm)