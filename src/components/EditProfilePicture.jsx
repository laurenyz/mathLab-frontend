import React from 'react'
import {connect} from 'react-redux'
import {uploadingProfilePicture} from '../redux/actions'
import {withRouter} from 'react-router-dom'


class EditProfilePicture extends React.Component {

    // constructor(){
    //     super()
    //     // this.state = {
    //     //     image: null
    //     // }
    // }

    handleSubmit = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        // this.setState({image: formData.get("image")})
        this.props.uploadingProfilePicture(formData, this.props.user.id)

    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor ="image">Profile Picture:</label>
                    <input id="profile-photo-input" type="file" accept="image/png, image/jpeg" name = "image"></input>
                    <input type= "submit" value = "Upload Photo"></input>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadingProfilePicture: (formData, userId) => dispatch(uploadingProfilePicture(formData, userId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfilePicture))