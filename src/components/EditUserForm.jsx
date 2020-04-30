import React from 'react'
import {connect} from 'react-redux'
import {editingUser} from '../redux/actions'
import {withRouter} from 'react-router-dom'

class EditUserForm extends React.Component {

    constructor(props){
        super(props)
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
            email: "",
        })
    }

    render(){
        return(<div>
            <h2>Edit Profile</h2>
            <form onSubmit = {this.handleOnSubmit}>
                <label>Name:</label>
                <input name = "name" type = "text" onChange = {this.handleOnChange} value = {this.state.name}></input>
                <label>Username:</label>
                <input name = "username" type = "text" onChange = {this.handleOnChange} value = {this.state.username}></input>
                <label>Email:</label>
                <input name = "email" type = "text" onChange = {this.handleOnChange} value = {this.state.email}></input>
                <input type = "submit" value = "Update Account"></input>
            </form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUserForm))