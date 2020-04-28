import React from 'react'

const ProfileDetailsBox = (props) => {
    if (props.user){
    return(<div>
        <h1>Username: {props.user.username}</h1>
        {/* <h1>Total Upvotes: {calculateVotes()}</h1> */}
        <br>
        </br>
        <h3>Name: {props.user.name}</h3>
        <h3>Email: {props.user.email}</h3>
        <h3>Member Since: {calculateStartMonth()} {getStartYear()}</h3>
    </div>)
    }else{return null}

    function getStartYear(){
        let date = new Date(props.user.created_at)
        return date.getFullYear()
    }

    function calculateStartMonth(){
        let date = new Date(props.user.created_at)
        let monthNum = date.getMonth()
        let month
        switch(monthNum){
            case 0:
                month = "January"
                break
            case 1:
                month = "February"
                break
            case 2:
                month = "March"
                break
            case 3:
                month = "April"
                break
            case 4:
                month = "May"
                break
            case 5:
                month = "June"
                break
            case 6:
                month = "July"
                break
            case 7:
                month = "August"
                break
            case 8:
                month = "September"
                break
            case 9:
                month = "October"
                break
            case 10:
                month = "November"
                break
            case 11:
                month = "December"
                break
            default:
                month = null
        }
        return month 
    }

// function calculateVotes(){
//     let totalUpvotes = 0
//     props.user.replies.forEach(reply =>{
//         totalUpvotes += reply.upvotes.length
//     })
//     return totalUpvotes
// }
}

export default ProfileDetailsBox