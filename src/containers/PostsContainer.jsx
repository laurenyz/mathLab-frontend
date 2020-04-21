import React from 'react'
import SearchBar from '../components/SearchBar'
import SubjectFilter from '../components/SubjectFilter'
import PostCard from '../components/PostCard'

const PostsContainer = () => {
    return(<div>
        PostsContainer 
        <SearchBar />
        <SubjectFilter />
        <PostCard />
    </div>)
}

export default PostsContainer