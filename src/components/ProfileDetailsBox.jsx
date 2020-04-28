import React from 'react'

const ProfileDetailsBox = (props) => {
    if (props.user){
    return(<div>
        <h1>Username: {props.user.username}</h1>
        {/* <h1>Total Upvotes: {calculateVotes()}</h1> */}
        <br>
        </br>
        <h3>Name2: {props.user.name}</h3>
        <h3>Email: {props.user.email}</h3>
        <h3>Member Since: {props.user.created_at}</h3>
    </div>)
    }else{return null}

// function calculateVotes(){
//     let totalUpvotes = 0
//     props.user.replies.forEach(reply =>{
//         totalUpvotes += reply.upvotes.length
//     })
//     return totalUpvotes
// }
}

export default ProfileDetailsBox