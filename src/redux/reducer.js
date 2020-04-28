import { combineReducers } from 'redux'

const postsReducer = (state = [], action) => {
  let newPosts
  switch(action.type){
    case "FETCHED_POSTS":
      return action.payload
    case "ADDED_POST":
      const newPostArray = [...state]
      newPostArray.unshift(action.payload)
      return newPostArray
    case "ADDED_REPLY":
      newPosts = state.map(p => {
        if(p.id !== action.payload.post_id){
          return p
        }else{
          return {
            ...p,
            replies: [...p.replies, action.payload]
          }
      }})
      return newPosts
    case "ADDED_UPVOTE":
      newPosts = [...state]
      newPosts.map( post => {
        if (post.replies.find(r=>r.id === action.payload.reply_id)){
          let newReplies = []
          post.replies.forEach(r=>{
            if(r.id === action.payload.reply_id){
              r = {...r, upvotes: [...r.upvotes, action.payload]}
            }
            newReplies.push(r)
            return newReplies
          })
          return post.replies = newReplies
        }
        return post
      }
      )
      return newPosts
    case "DELETED_POST":
      const postArray = state.filter(p => p.id !== action.payload.id)
      return postArray
    case "DELETED_REPLY":

      newPosts = state.map(p=>{
        if(p.id !== action.payload.post_id){
          return p
        } else {
          return {
            ...p,
            replies: p.replies.filter(r => r.id!== action.payload.id)
          }
      }})
        return newPosts
    default: return state
  }
}

const userReducer = (state = null, action) => {
  switch(action.type){
    case "LOGIN_USER":
      return action.payload
    case "REMOVE_USER":
      return null
    default: return state
  }
}

const searchTermReducer = (state = "", action) => {
  switch(action.type){
    case "UPDATE_SEARCH_TERM":
      return action.payload
    default: return state
  }
}

const filterSubjectReducer = (state = "", action) => {
  switch(action.type){
    case "UPDATE_FILTER_SUBJECT":
      return action.payload
    default: return state
  }
}

const userUpvotesReducer = (state = null, action) => {
  switch(action.type){
    case "FETCHED_USER_UPVOTES":
      return action.payload
    default: return state
  }
}

const rootReducer = combineReducers({
    user: userReducer,  
    posts: postsReducer,
    searchTerm: searchTermReducer,
    filterSubject: filterSubjectReducer,
    userUpvotes: userUpvotesReducer
  });
  
  export default rootReducer;

