import { combineReducers } from 'redux'

const postsReducer = (state = [], action) => {
  let posts
  switch(action.type){
    case "FETCHED_POSTS":
      return action.payload
    case "ADDED_POST":
      posts = [...state]
      posts.unshift(action.payload)
      return posts
    case "ADDED_REPLY":
      posts = state.map(p => {
        if(p.id !== action.payload.post_id){
          return p
        }else{
          return {
            ...p,
            replies: [...p.replies, action.payload]
          }
      }})
      return posts
    case "ADDED_UPVOTE":
      posts = state.map(p=> {
        if (p.replies.find(r => r.id === action.payload.reply_id)){
          const replies = p.replies.map(r => {
            if (r.id === action.payload.reply_id){
              return {...r, upvotes: [...r.upvotes, action.payload]}
            } else {
              return r
            }
          })
          return {...p, replies: replies}
        } else {
          return p
        }
      })
      return posts
    case "DELETED_POST":
      posts = state.filter(p => p.id !== action.payload.id)
      return posts
    case "DELETED_REPLY":
      posts = state.map(p=>{
        if(p.id !== action.payload.post_id){
          return p
        } else {
          return {
            ...p,
            replies: p.replies.filter(r => r.id!== action.payload.id)
          }
      }})
        return posts
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

const profilePictureReducer = (state = null, action) => {
  switch(action.type){
    case "LOADED_PROFILE_PICTURE":
      return action.payload
    case "REMOVE_PROFILE_PICTURE":
      return null
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
    userUpvotes: userUpvotesReducer,
    profilePicture: profilePictureReducer
  });
  
  export default rootReducer;

