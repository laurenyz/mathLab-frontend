function addPost(post) {
    return {
        type: "ADD_POST",
        payload: {text: post.text, id:post.id}
    }
}

export {addPost}



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
