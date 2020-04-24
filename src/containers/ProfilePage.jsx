import React from 'react'
import ProfileImageBox from '../components/ProfileImageBox'
import ProfileDetailsBox from '../components/ProfileDetailsBox'
import ProfilePostsBox from './ProfilePostsBox'
import ProfileRepliesBox from './ProfileRepliesBox'
import {connect} from 'react-redux'

const ProfilePage = (props) => {
    if(props.user){
    return(<div>
        ProfilePage
        <ProfileImageBox />
        <ProfileDetailsBox user = {props.user} userUpvotes = {props.userUpvotes}/>
        <ProfilePostsBox userPosts = {props.userPosts}/>
        <ProfileRepliesBox userReplies = {props.userReplies}/>
    </div>)} else {
        return null
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        userReplies: state.userReplies,
        userPosts: state.userPosts,
        userUpvotes: state.userUpvotes
    }
}

export default connect(mapStateToProps)(ProfilePage)