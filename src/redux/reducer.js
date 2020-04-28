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
      const postWithResponse = state.find(p => p.id === action.payload.post_id)
      const repliesArray = postWithResponse.replies
      const foundReply = repliesArray.find(r => r.id === action.payload.id)
      const remainingReplies = repliesArray.filter(r => r.id !== foundReply.id)
      postWithResponse.replies = remainingReplies
      return [...state, postWithResponse]
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

const rootReducer = combineReducers({
    user: userReducer,  
    posts: postsReducer
  });
  
  export default rootReducer;

