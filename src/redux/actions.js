function addPost(post) {
    return {
        type: "ADD_POST",
        payload: {text: post.text, id:post.id}
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

export {addPost, fetchingPosts}



// function changeSearchText(value) {
//     return { type: "CHANGE_SEARCH_TEXT", payload: value };
//   }
  
//   function vote(paintingId) {
//     return { type: "INCREASE_VOTES", payload: paintingId };
//   }
  
//   function updatePainting({ title, name, birthday, deathday, paintingId }) {
//     return {
//       type: "UPDATE_PAINTING",
//       payload: { title, name, birthday, deathday, paintingId}
//     };
//   }
  
//   export { changeSearchText, vote, updatePainting };
