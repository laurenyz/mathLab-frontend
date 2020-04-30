import React from 'react'
import {Route, Switch, withRouter, Redirect} from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import Homescreen from './components/Homescreen'
import ScratchPadContainer from './containers/ScratchPadContainer'
import PostsContainer from './containers/PostsContainer'
import PostShowPage from './containers/PostShowPage'
import ProfilePage from './containers/ProfilePage'
import NewUserForm from './components/NewUserForm'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import EditUserForm from './components/EditUserForm'
import {connect} from 'react-redux'
import {fetchingPosts, fetchingUser} from './redux/actions'
import CalculatorContainer from './containers/CalculatorContainer'


class App extends React.Component {

  componentDidMount() {
    this.props.fetchingPosts()
    if (localStorage.getItem('jwt')) {
      this.props.fetchingUser()
    }
  }

  render() {return ( 
    <div>
      <Navbar />
        <Switch>
          <Route exact path = '/calculator' component = {CalculatorContainer} />
          <Route exact path = "/" component = {Homescreen} />
          <Route exact path = "/scratchpads/:url" component = {ScratchPadContainer} />
          <Route exact path = "/posts" component = {PostsContainer} />
          <Route exact path = "/posts/new" component = {NewPostForm} />
          <Route exact path = "/posts/:id" render= {(props) => {
            if (this.props.posts.length>0){
                let postId = parseInt(props.match.params.id)
                let foundPost = this.props.posts.find(p => p.id === postId)
                if (foundPost) {
                  return<PostShowPage post = {foundPost} />
                } else {
                  alert("This post has been removed.")
                  return<Redirect to="/posts" />
                }
            } else {
              return null}
          }} />
          <Route exact path = "/profile/edit" render = { () => (this.props.user ?  <EditUserForm /> : null) }/>
          <Route exact path = "/profile" render= {() => (this.props.user ? <ProfilePage /> :<Redirect to="/" /> )}/>
          <Route exact path = "/users/new" render= {() => (this.props.user ? <Redirect to="/profile"/> : <NewUserForm /> )}/>
          <Route exact path = "/login" render= {() => (this.props.user ? <Redirect to="/profile"/> : <LoginForm /> )}/>
        </Switch>
      </div>
  )}
}

const mapStateToProps = state => {
  return ({
    posts: state.posts,
    user: state.user
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    fetchingUser: () => {dispatch(fetchingUser())},
    fetchingPosts: () => {dispatch(fetchingPosts())},
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

