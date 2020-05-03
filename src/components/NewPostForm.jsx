import React from 'react'
import subjectsData from '../subjects.json'
import {connect} from 'react-redux'
import {addingPost} from '../redux/actions'
import {withRouter} from "react-router-dom"

class NewPostForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            text: "",
            subject: "",
            tags: ""
        }
    }

    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        if(this.state.subject !== ""){
        this.props.addingPost({history: this.props.history, post: {user_id: this.props.user.id, 
            post_text: this.state.text, 
            subject: this.state.subject,
            tags: this.state.tags}})
        this.setState(
            {text: "", 
            subject: "",
            tags: ""
        })} else {
            alert ("Subject cannot be blank.")
        }
    }

    alphabetizedSubjects = (subjectsData) => {
        return subjectsData.subjects.sort((a,b) => (a.name>b.name)? 1: -1)
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
                <input type = "text" name = "tags" placeholder = "add taglines with #" value = {this.state.tags} onChange = {this.handleOnChange}></input>
                <select name="subject" value = {this.state.subject} onChange = {this.handleOnChange}>
                    <option value="">SUBJECT</option>
                    {this.alphabetizedSubjects(subjectsData).map(subject => <option key = {subject.id} value = {subject.name}>{subject.name}</option>)}
                </select>
                <input type = "submit">
                </input>
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
        addingPost: post => dispatch(addingPost(post))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPostForm))

