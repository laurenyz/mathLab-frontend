import React from 'react'
import {connect} from 'react-redux'
import {addPost} from '../redux/actions'
import uuid from "uuid"

class NewPostForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            text: "",
            subject: "",
            availableSubjects: [{name: "Algebra", id: 1}, {name: "Trigonometry", id: 2}, {name: "Geometry", id: 3}, {name: "Pre-Calculus", id: 4}, {name: "Pre-Algebra", id: 5}, {name: "Other", id: 6}]
        }
    }

    handleOnChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.addPost({text: this.state.text, id: uuid()})
        this.setState(
            {text: "", 
            subject: ""
        })
    }


    render() {
        return(<div>
            NewPostForm:
            <form onSubmit = {this.handleOnSubmit}>
                <textarea placeholder = "Post Content..." 
                    value = {this.state.text} 
                    name = "text"
                    onChange = {this.handleOnChange}>
                </textarea>
                <select name="subject" value = {this.state.subject} onChange = {this.handleOnChange}>
                    <option value="">SUBJECT</option>
                    {this.state.availableSubjects.map(subject => <option key = {subject.id} value = {subject.name}>{subject.name}</option>)}
                </select>
                <input type = "submit">
                </input>
            </form>
        </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPost: post => dispatch(addPost(post))
    }
}

export default connect(null, mapDispatchToProps)(NewPostForm)

