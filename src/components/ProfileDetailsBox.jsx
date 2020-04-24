import React from 'react'

const ProfileDetailsBox = (props) => {
    return(<div>
        <h1>Username: {props.user.username}</h1>
        <h1>Total Upvotes: {props.userUpvotes}</h1>

        <br>
        </br>
        <h3>Name: {props.user.name}</h3>
        <h3>Email: {props.user.email}</h3>
        <h3>Member Since: {props.user.created_at}</h3>
    </div>)
}

export default ProfileDetailsBox