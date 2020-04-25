function addedPost(post) {
    return {
        type: "ADDED_POST",
        payload: post
    }
}

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
    .then(post => {
        if (post.error){
        alert(post.message)
        } else {
            dispatch(addedPost(post))
        alert("Your post has been submitted.")
        }})
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

function removeUser() {
return {
    type: "REMOVE_USER"
    }
}

function logoutUser() {
   return (dispatch) => {
       localStorage.removeItem("jwt")
       dispatch(removeUser())
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
            dispatch(fetchedUserReplies(json.replies))
            dispatch(fetchedUserUpvotes(json.upvotes))
            }
    })   
}}

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
        .then(posts => dispatch(fetchedPosts(posts.reverse())))
    }
}

function fetchUser() {
    return(dispatch) => {
        fetch("http://localhost:3000/profile", {
        headers: {
          "Authentication": localStorage.getItem('jwt')
        }
      }).then(resp => resp.json())
      .then(json => {
        dispatch(loginUser(json.user))
        dispatch(fetchedUserReplies(json.replies))
        dispatch(fetchedUserUpvotes(json.upvotes))
      })
    }
}

function createUser(userInfo){
    return(dispatch) => {
        fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({name: userInfo.name, username: userInfo.username, email: userInfo.email, password: userInfo.password, password_confirmation: userInfo.password_confirmation})
        })
        .then(resp => resp.json())
        .then(json => {
            if (json.error){
                alert(json.message)
                } else {
                localStorage.setItem('jwt', json.token)
                dispatch(loginUser(json.user))
                dispatch(fetchedUserReplies(json.replies))
                dispatch(fetchedUserUpvotes(json.upvotes))
                }
        })
    }
}


export {addingPost, fetchingPosts, loggingIn, logoutUser, fetchUser, createUser}

