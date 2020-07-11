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
    case "UPDATED_REPLIES_PROFILE_PICTURE":
      posts = state.map(p=> {
        if (p.replies.find(r => r.replier.id === action.payload.user.id)){
          let replies = p.replies.map(r => {
            if (r.replier.id === action.payload.user.id){
              return {...r, replier: {...r.replier, get_image_url: action.payload.image}}
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
    case "UPDATED_POSTS_PROFILE_PICTURE":
      posts = state.map(p =>{
        if(p.user.id === action.payload.user.id){
          return {...p, user: {...p.user, get_image_url: action.payload.image}}
        } else{
          return p
        }
      })
      return posts
    case "ADDED_UPVOTE":
      posts = state.map(p=> {
        if (p.replies.find(r => r.id === action.payload.reply_id)){
          let replies = p.replies.map(r => {
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
    case "DELETED_UPVOTE":
      posts = state.map(p=> {
        if (p.replies.find(r => r.id === action.payload.reply_id)){
          const replies = p.replies.map(r => {
            if (r.id === action.payload.reply_id){
              return {...r, upvotes: r.upvotes.filter(upvote => upvote.id !== action.payload.id)}
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

const userScratchpadsReducer = (state = [], action) => {
  let pads
  switch(action.type){
    case "FETCHED_USER_SCRATCHPADS":
      return action.payload
    case "ADDED_SCRATCHPAD":
      return [...state, action.payload]
    case "DELETED_SAVED_SCRATCHPAD":
      pads = state.filter(p => p.id !== action.payload.id)
      return pads
    case "UPDATED_SAVED_SCRATCHPAD":
      pads = state.map(p => {
          if(p.id === action.payload.id){
            return {...p, name: action.payload.name}
          } else{
            return p
          }
        })
      return pads
    default: return state
  }
}

const receivedFetchReducer = (state = false, action) => {
  switch(action.type){
    case "RECEIVED_FETCH":
      return true
    
    default: return state
  }
}

const rootReducer = combineReducers({
    user: userReducer,  
    posts: postsReducer,
    searchTerm: searchTermReducer,
    filterSubject: filterSubjectReducer,
    userUpvotes: userUpvotesReducer,
    profilePicture: profilePictureReducer,
    userScratchpads: userScratchpadsReducer,
    receivedFetch: receivedFetchReducer
  });
  
  export default rootReducer;

