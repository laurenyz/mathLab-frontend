import React from 'react'
import {deleteUser} from '../redux/actions'
import {connect} from 'react-redux'

const ProfileImageBox = (props) => {
    return(<div>
        <div>IMAGE</div>
        <button onClick = {handleEditOnClick}>Edit Profile</button>
        <button onClick = {handleDeleteOnClick}>Delete Profile</button>
    </div>)

    function handleEditOnClick(){
        console.log("editing profile")
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

export default connect(mapStateToProps, {deleteUser})(ProfileImageBox)