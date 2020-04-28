function updateSearchTerm(searchTerm){
    return{
        type: "UPDATE_SEARCH_TERM",
        payload: searchTerm
    }
}

function deletedPost(post){
    return{
        type: "DELETED_POST",
        payload: post
    }
}

function deletingPost(post){
    return (dispatch) => {
        fetch(`http://localhost:3000/posts/${post.id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(dispatch(deletedPost(post)))
    }
}

function deletedReply(reply){
    return {
        type: "DELETED_REPLY",
        payload: reply
    }
}

function deletingReply(reply){
    return (dispatch) => {
        fetch(`http://localhost:3000/replies/${reply.id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(dispatch(deletedReply(reply)))
    }
}

function addedPost(post) {
    return {
        type: "ADDED_POST",
        payload: post
    }
}

function addingPost(info) {
    return (dispatch) => {
        fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(info.post)
    })
    .then(resp => resp.json())
    .then(post => {
        if (post.error){
        alert(post.message)
        } else {
            dispatch(addedPost(post))
        info.history.push(`/posts/${post.id}`)
        }})
    }
}

function addedReply(reply){
    return {
        type: "ADDED_REPLY",
        payload: reply
    }
}

function addingReply(reply){
    return(dispatch) => {
        fetch('http://localhost:3000/replies', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(reply)
    })
    .then(resp => resp.json())
    .then(reply => dispatch(addedReply(reply)))
    }
}

function addedUpvote(upvote){
    return {
        type: "ADDED_UPVOTE",
        payload: upvote
    }
}

function addingUpvote(upvote){
    return(dispatch) => {
        fetch('http://localhost:3000/upvotes', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(upvote)
        })
        .then(resp => resp.json())
        .then(upvote => dispatch(addedUpvote(upvote)))
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
   } 
}

function loginUser(user) {
    return {
        type: "LOGIN_USER",
        payload: user
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

function fetchingUser() {
    return(dispatch) => {
        fetch("http://localhost:3000/profile", {
        headers: {
          "Authentication": localStorage.getItem('jwt')
        }
      }).then(resp => resp.json())
      .then(json => {
        dispatch(loginUser(json.user))
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
                }
        })
    }
}


export {updateSearchTerm, deletingReply, deletingPost, addingPost, addingReply, addingUpvote, fetchingPosts, loggingIn, logoutUser, fetchingUser, createUser}

