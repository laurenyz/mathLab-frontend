function addPost(post) {
    return {
        type: "ADD_POST",
        payload: {text: post.text, id:post.id}
    }
}

function removeUserUpvotes() {
    return{
        type: "REMOVE_USER_UPVOTES"
    }
}

function removeUserReplies() {
    return{
        type: "REMOVE_USER_REPLIES"
    }
}

function removeUserPosts() {
    return {
        type: "REMOVE_USER_POSTS"
    }
}

function removeUser() {
return {
    type: "REMOVE_USER"
    }
}

function logoutUser() {
   return (dispatch) => {
       localStorage.removeItem("jwt")
       dispatch(removeUser())
       dispatch(removeUserPosts())
       dispatch(removeUserReplies())
       dispatch(removeUserUpvotes())
   } 
}

function loginUser(user) {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

function fetchedUserUpvotes (upvotes) {
    return {
        type: "FETCHED_USER_UPVOTES",
        payload: upvotes
    }
}

function fetchedUserReplies(replies) {
    return {
        type: "FETCHED_USER_REPLIES",
        payload: replies
    }
}

function fetchedUserPosts(posts) {
    return {
        type: "FETCHED_USER_POSTS",
        payload: posts
    }
}

function loggingIn(credentials){
    return (dispatch) => {
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
    .then(resp=>resp.json())
    .then(json => {
        if (json.error){
            alert(json.message)
            } else {
            localStorage.setItem('jwt', json.token)
            dispatch(loginUser(json.user))
            dispatch(fetchedUserPosts(json.posts))
            dispatch(fetchedUserReplies(json.replies))
            dispatch(fetchedUserUpvotes(json.upvotes))
            }
    })   
}}

// need user
function addingPost(post) {
    return (dispatch) => {
        fetch('http://localhost:3000/posts',{
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(post)
    })
    .then(resp => resp.json())
    .then(post => console.log(post))
    }
}

function fetchedPosts(posts){
    return{
        type: "FETCHED_POSTS",
        payload: posts
    }
}

function fetchingPosts() {
    return(dispatch) => {
        fetch('http://localhost:3000/posts')
        .then(resp => resp.json())
        .then(posts => dispatch(fetchedPosts(posts)))
    }
}

function fetchUser() {
    return(dispatch) => {
        fetch("http://localhost:3000/profile",{
        headers: {
          "Authentication": localStorage.getItem('jwt')
        }
      }).then(resp => resp.json())
      .then(json => {
        dispatch(loginUser(json.user))
        dispatch(fetchedUserPosts(json.posts))
        dispatch(fetchedUserReplies(json.replies))
        dispatch(fetchedUserUpvotes(json.upvotes))
      })
    }
}

export {addPost, fetchingPosts, loggingIn, logoutUser, fetchUser}


