import React from 'react'
import {deleteUser} from '../redux/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const ProfileImageBox = (props) => {
    return(<div>
        {props.profilePicture? <img style = {{width: "20%", height: "20%"}}src = {props.profilePicture} alt = {props.user.name} /> : null}
        <button onClick = {handlePictureEditOnClick}>Edit Profile Picture</button>
        <button onClick = {handleEditOnClick}>Edit Profile</button>
        <button onClick = {handleDeleteOnClick}>Delete Profile</button>
    </div>)

    function handlePictureEditOnClick(){
        props.history.push("/profile/image/edit")
    }

    function handleEditOnClick(){
        props.history.push("/profile/edit")
    }

    function handleDeleteOnClick(){
        props.deleteUser(props.user)

    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        profilePicture: state.profilePicture
    }
}

export default withRouter(connect(mapStateToProps, {deleteUser})(ProfileImageBox))