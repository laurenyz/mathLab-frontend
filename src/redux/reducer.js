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

const rootReducer = combineReducers({
    posts: postsReducer
  });
  
  export default rootReducer;

