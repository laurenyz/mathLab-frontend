import React from 'react'
import ProfileImageBox from '../components/ProfileImageBox'
import ProfileDetailsBox from '../components/ProfileDetailsBox'
import ProfilePostsBox from './ProfilePostsBox'
import ProfileRepliesBox from './ProfileRepliesBox'

const ProfilePage = () => {
    return(<div>
        ProfilePage
        <ProfileImageBox />
        <ProfileDetailsBox />
        <ProfilePostsBox />
        <ProfileRepliesBox />
        
    </div>)
}

export default ProfilePage