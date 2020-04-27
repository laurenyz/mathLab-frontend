import React from 'react'
import {addingReply} from '../redux/actions'
import {connect} from 'react-redux'

class NewReplyForm extends React.Component {

    constructor(){
        super()
        this.state = {
            text: ""
        }
    }

    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.addingReply({replier_id: this.props.user.id, post_id: this.props.post.id, reply_text: this.state.text})
        this.setState({
            text: ""
        })
    }

    render() {
        return(<div>
            Add a Reply:
            <form onSubmit = {this.handleOnSubmit}>
                <textarea placeholder = "Reply..."
                    value = {this.state.text}
                    name = "text"
                    onChange = {this.handleOnChange}>
                </textarea>
                <input type = "submit" value = "Post Reply"></input>
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
    return{
        addingReply: reply => dispatch(addingReply(reply))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReplyForm)