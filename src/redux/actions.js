function addPost(post) {
    return {
        type: "ADD_POST",
        payload: {text: post.text, id:post.id}
    }
}

function loginUser(user) {
    return {
        type: "LOGIN_USER",
        payload: user
    }
}

function fetchedUserReplies(replies) {
    return{
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
            }
    })
    
}
}

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
    return (dispatch) => {
        fetch('http://localhost:3000/posts')
        .then(resp => resp.json())
        .then(posts => dispatch(fetchedPosts(posts)))
    }
}

export {addPost, fetchingPosts, loggingIn}


