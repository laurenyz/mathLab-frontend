import React from 'react'

const ProfileImageBox = () => {
    return(<div>
        ProfileImageBox,
        <button onClick = {handleEditOnClick}>Edit Profile</button>
        <button onClick = {handleDeleteOnClick}>Delete Profile</button>
    </div>)

    function handleEditOnClick(){
        console.log("editing profile")
    }

    function handleDeleteOnClick(){
        console.log("deleting profile")
    }
}

export default ProfileImageBox