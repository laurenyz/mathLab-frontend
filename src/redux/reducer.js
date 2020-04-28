import { combineReducers } from 'redux'

const postsReducer = (state = [], action) => {
  switch(action.type){
    case "FETCHED_POSTS":
      return action.payload
    case "ADDED_POST":
      const newPostArray = [...state]
      newPostArray.unshift(action.payload)
      return newPostArray
    case "ADDED_REPLY":
      const foundPost = state.find(p => p.id === action.payload.post_id)
      foundPost.replies.push(action.payload)
      return [...state, foundPost]
    case "ADDED_UPVOTE":

        // let newPaintings = oldState.map(p => {
        //   if(p.id !== action.payload){
        //     return p
        //   }else{
        //     return {
        //       ...p,
        //       votes: p.votes + 1
        //     }
        //   }
        // })

      let newPosts = state.map(p => {
        if(p.replies.find(r => r.id === action.payload.reply_id)){
          let arr = p.replies.map(r=>{
            if(r.id !== action.payload.reply_id){
              return r
            } else {
              return {
                ...r,
                upvotes: [...r.upvotes, action.payload]
              }
            }
          })
          return {...p, replies: arr}
        } else {
          return{
            p
          }
        }
      })
      return newPosts
      // const oldState = [...state]
      // post = oldState.find(p => p.replies.find(r => r.id === action.payload.reply_id))
      // reply = post.replies.find(r => r.id === action.payload.reply_id)
      // reply.upvotes.push(action.payload)
      // return [...oldState]
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

