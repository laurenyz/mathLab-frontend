import React from 'react'
import PostCard from '../components/PostCard'

const ProfilePostsBox = (props) => {
    return(<div>
        <h1>Posts:</h1>
        {props.userPosts.map(post => <PostCard post={post} key={post.id}/>)}
    </div>)
}

export default ProfilePostsBox