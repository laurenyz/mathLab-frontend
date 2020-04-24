import { combineReducers } from 'redux'

const postsReducer = (state = [], action) => {
  switch(action.type){
    case "FETCHED_POSTS":
      return action.payload
    case "ADD_POST":
      return [...state, {post_text: action.payload.text, id: action.payload.id}]
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

const userUpvotesReducer = (state = null, action) =>{
  switch(action.type){
    case "FETCHED_USER_UPVOTES":
      return action.payload
    case "REMOVE_USER_UPVOTES":
      return null
    default: return state
  }
}

const userPostsReducer = (state = [], action) => {
  switch(action.type){
    case "FETCHED_USER_POSTS":
      return action.payload
    case "REMOVE_USER_POSTS":
      return []
    default: return state
  }
}

const userRepliesReducer = (state = [], action) => {
  switch(action.type){
    case "FETCHED_USER_REPLIES":
      return action.payload
    case "REMOVE_USER_REPLIES":
      return []
    default: return state
  }
}

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    userPosts: userPostsReducer,
    userReplies: userRepliesReducer,
    userUpvotes: userUpvotesReducer
  });
  
  export default rootReducer;

