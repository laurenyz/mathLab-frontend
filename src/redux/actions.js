function addedScratchPad(user_scratchpad) {
    return {
        type: "ADDED_SCRATCHPAD",
        payload: user_scratchpad
    }
}

function savingScratchPad(saveData) {
    return (dispatch) => {
        fetch('https://laurenyz-mathlab.herokuapp.com/user_scratchpads', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(saveData)
    })
    .then(resp => resp.json())
    .then(json => {
        if (json.error){
        alert(json.message)
        } else {
            dispatch(addedScratchPad(json.user_scratchpad))
        }})
    }
}

function fetchedUserScratchPads(scratchpads) {
    return{
        type: "FETCHED_USER_SCRATCHPADS",
        payload: scratchpads
    }
}

function loadedProfilePicture(profilePictureData){
    return{
        type: "LOADED_PROFILE_PICTURE",
        payload: profilePictureData
    }
}

function uploadingProfilePicture(formData, userId){
    return (dispatch, getState) => {
     fetch(`https://laurenyz-mathlab.herokuapp.com/users/${userId}/upload_image`, {
     method: "POST",
     // credentials: "include",
     headers: {
         "Accept": "application/json"
     },
     body: formData
 })
 .then(resp => resp.json())
 .then(profilePictureData => {
       if (profilePictureData.error) {
         alert(profilePictureData.error)
       } else {
            dispatch(loadedProfilePicture(profilePictureData.image_url))
            dispatch(updatedPostsProfilePicture({image: profilePictureData.image_url, user: getState().user}))
            dispatch(updatedRepliesProfilePicture({image: profilePictureData.image_url, user: getState().user}))
        }})}
 }

 function updatedPostsProfilePicture(data){
     return{
         type: "UPDATED_POSTS_PROFILE_PICTURE",
         payload: data
     }
 }

 function updatedRepliesProfilePicture(data){
    return{
        type: "UPDATED_REPLIES_PROFILE_PICTURE",
        payload: data
    }
}
 
 function fetchedUserUpvotes(upvotes){
     return{
         type: "FETCHED_USER_UPVOTES",
         payload: upvotes
     }
 }
 
 function updateFilterSubject(subject){
     return{
         type: "UPDATE_FILTER_SUBJECT",
         payload: subject
     }
 }
 
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
 
 function deletingPost({post, history}){
     return (dispatch) => {
         fetch(`https://laurenyz-mathlab.herokuapp.com/posts/${post.id}`,{
             method: "DELETE"
         })
         .then(resp => resp.json())
         .then(() => {
             history.push("/posts")
             alert("Deleting post...")
             dispatch(deletedPost(post))
         })
     }
 }

 function deletedSavedScratchPad(user_scratchpad){
     return{
         type: "DELETED_SAVED_SCRATCHPAD",
         payload: user_scratchpad
     }
 }

 function deletingSavedScratchPad(user_scratchpad){
     return(dispatch) => {
        fetch(`https://laurenyz-mathlab.herokuapp.com/user_scratchpads/${user_scratchpad.id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(() => {
            dispatch(deletedSavedScratchPad(user_scratchpad))
        })
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
         fetch(`https://laurenyz-mathlab.herokuapp.com/replies/${reply.id}`,{
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
         fetch('https://laurenyz-mathlab.herokuapp.com/posts', {
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
         fetch('https://laurenyz-mathlab.herokuapp.com/replies', {
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

function deletedUpvote(upvote){
    return{
        type: "DELETED_UPVOTE",
        payload: upvote
    }
}
 
function deletingUpvote(upvote){
    return (dispatch) => {
        fetch(`https://laurenyz-mathlab.herokuapp.com/upvotes/${upvote.id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(() => {dispatch(deletedUpvote(upvote))})
    }
}

 function addingUpvote(upvote){
     return(dispatch) => {
         fetch('https://laurenyz-mathlab.herokuapp.com/upvotes', {
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

 function removeProfilePicture() {
     return{
         type: "REMOVE_PROFILE_PICTURE"
     }
 }
 
 function logoutUser() {
    return (dispatch) => {
        localStorage.removeItem("jwt")
        dispatch(removeUser())
        dispatch(removeProfilePicture())
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
     fetch('https://laurenyz-mathlab.herokuapp.com/login', {
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
             credentials.handleClose()
             localStorage.setItem('jwt', json.token)
             dispatch(loginUser(json.user))
             dispatch(fetchedUserUpvotes(json.upvotes))
             dispatch(loadedProfilePicture(json.image_url))}
             if(json.scratchpads){
                const scratchpadsArray = json.scratchpads.sort((a,b)=>(a.id>b.id? 1 : -1))
                dispatch(fetchedUserScratchPads(scratchpadsArray))
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
         fetch('https://laurenyz-mathlab.herokuapp.com/posts')
         .then(resp => resp.json())
         .then(posts => {
             const postArray = posts.sort((a,b)=>(a.id<b.id? 1 : -1))
             dispatch(fetchedPosts(postArray))})
     }
 }
 
 function fetchingUser() {
     return(dispatch) => {
         fetch("https://laurenyz-mathlab.herokuapp.com/profile", {
         headers: {
           "Authentication": localStorage.getItem('jwt')
         }
       }).then(resp => resp.json())
       .then(json => {
         dispatch(loginUser(json.user))
         dispatch(fetchedUserUpvotes(json.upvotes))
         dispatch(loadedProfilePicture(json.image_url))
         if(json.scratchpads){
            const scratchpadsArray = json.scratchpads.sort((a,b)=>(a.id>b.id? 1 : -1))
            dispatch(fetchedUserScratchPads(scratchpadsArray))
         }
       })
     }
 }
 
 function deleteUser(user){
     return (dispatch, getState) => {
         fetch(`https://laurenyz-mathlab.herokuapp.com/users/${user.id}`,{
             method: "DELETE"
         })
         .then(resp => resp.json())
         .then(() => {
             dispatch(logoutUser())
             const userPosts = getState().posts.filter(p => p.user_id === user.id)
             userPosts.forEach(post => dispatch(deletedPost(post)))
             const userReplies = [] 
             getState().posts.forEach(post =>{
                 post.replies.forEach(reply => {
                     if(reply.replier_id === user.id) {
                         userReplies.push(reply)
                     }
                 })
             })
             userReplies.forEach(reply => dispatch(deletedReply(reply)))
         })
     }
 }
 function updatedSavedScratchpad(user_scratchpad){
    return{
        type: "UPDATED_SAVED_SCRATCHPAD",
        payload: user_scratchpad
    }
 }

 function editingSavedScratchpad(user_scratchpad){
    return(dispatch) => {
        fetch(`https://laurenyz-mathlab.herokuapp.com/user_scratchpads/${user_scratchpad.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user_scratchpad)
        })
        .then(resp => resp.json())
        .then(json => {
            if (json.error){
              alert(json.message)
            } else {
              dispatch(updatedSavedScratchpad(json.user_scratchpad))
    }})
}
 }
 
 function editingUser(userInfo){
     const {id, name, username, email, history} = userInfo
     return(dispatch) => {
         fetch(`https://laurenyz-mathlab.herokuapp.com/users/${userInfo.id}`, {
             method: "PATCH",
             headers: {
                 'Content-Type': "application/json",
                 "Accept": "application/json"
             },
             body: JSON.stringify({id, name, username, email})
         })
         .then(resp => resp.json())
         .then(json => {
             if (json.error){
               alert(json.message)
             } else {
               dispatch(loginUser(json.user))
               dispatch(fetchingPosts())
               history.push('/profile')
     }})
 }}
 
 function createUser(userInfo){
     return(dispatch) => {
         fetch("https://laurenyz-mathlab.herokuapp.com/users", {
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
                 userInfo.handleNewUserClose()
                 localStorage.setItem('jwt', json.token)
                 dispatch(loginUser(json.user))
                 dispatch(fetchedUserUpvotes(json.upvotes))
                 dispatch(loadedProfilePicture(json.image_url))
                 }
         })
     }
 }
 
 
 export {editingSavedScratchpad, deletingSavedScratchPad, savingScratchPad, uploadingProfilePicture, updateFilterSubject, updateSearchTerm, deletingReply, deletingPost, addingPost, addingReply, deletingUpvote, addingUpvote, fetchingPosts, loggingIn, logoutUser, fetchingUser, createUser, editingUser, deleteUser}