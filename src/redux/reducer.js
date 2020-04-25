import { combineReducers } from 'redux'

const postsReducer = (state = [], action) => {
  switch(action.type){
    case "FETCHED_POSTS":
      return action.payload
    case "ADDED_POST":
      let newPostArray = [...state]
      newPostArray.unshift(action.payload)
      return newPostArray
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
    userReplies: userRepliesReducer,
    userUpvotes: userUpvotesReducer
  });
  
  export default rootReducer;

