import React from 'react'
import {deleteUser} from '../redux/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const ProfileImageBox = (props) => {
    return(<div>
        <div>IMAGE</div>
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
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {deleteUser})(ProfileImageBox))