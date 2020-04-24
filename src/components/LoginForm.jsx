import React from 'react'

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
        console.log("submitting")
        this.setState({email: "", password: ""})
    }

    render(){
        return(
            <div>
                <h1>ma+hLab</h1>
                <form onSubmit = {this.handleOnSubmit}>
                    <input name = "email" type = "text" placeholder = "Email..." onChange = {this.handleOnChange}></input>
                    <input name = "password" type = "password" placeholder = "Password..." onChange = {this.handleOnChange}></input>
                    <input type = "submit"></input>
        
                </form>
            </div>)
    }
    
}

export default LoginForm