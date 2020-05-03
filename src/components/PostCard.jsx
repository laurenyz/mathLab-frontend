import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletingPost, updateFilterSubject } from '../redux/actions'
import clsx from 'clsx';
import { makeStyles, Card, IconButton, CardHeader, CardContent, CardActions, Collapse, Avatar, CardActionArea, Button, Divider, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  deleteBtn: {
    float: 'right'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const PostCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const {post, deletingPost, user, history} = props
    
    return(
        <Card className={classes.root} variant = "outlined" >
            <CardActionArea onClick = {handleOnClick}>
                <CardHeader
                    avatar={
                    <Avatar alt={post.user.username} src={post.user.get_image_url} />
                    }
                    title={post.user.username}
                    subheader={`${getCreatedDate()} ${getCreatedTime()}`}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {post.post_text}
                  </Typography>
                  {post.tags.length !==0 && post.tags[0].tagline!== "" ? <Typography variant="body2" color="textSecondary" component="p">{`#${post.tags[0].tagline}`}</Typography> : null}
                </CardContent>    
            </CardActionArea>
            <CardActions disableSpacing>
                <Button onClick = {handleSubjectOnClick}>{post.subject}</Button>
                {(user && user.id === post.user.id?
                    <IconButton className={classes.deleteBtn} aria-label="delete" onClick = {handleDeleteOnClick}>
                        <DeleteIcon />
                    </IconButton>
                    : null
                )}
                {(post.replies.length > 0 ?
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                    : null
                )}
                
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {arrangeRepliesByUpvotes().map(reply => {
                return(
                    <CardContent key = {reply.id}>
                        <Divider  />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {(reply.reply_text.length > 200 ? `${reply.reply_text.substring(0, 200)}...` : reply.reply_text)}  
                        </Typography>
                    </CardContent>
                )
            })}
            </Collapse>
        </Card>
    )

function arrangeRepliesByUpvotes(){
    return post.replies.sort((a,b) =>(a.upvotes>b.upvotes? -1 : b.upvtes>a.upvotes? 1: 0))
}

function getCreatedTime() {
    let date = new Date(post.created_at)
    let hour = date.getHours() 
    let minutes = date.getMinutes() 
    let timeOfDay
        if (hour>11){
            timeOfDay = "PM"
            if(hour > 12){
                hour -= 12
            }
        } else if (hour === 0) {
            timeOfDay = "AM"
            hour = 12
        } else {
            timeOfDay = "AM"
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
          }

        return `${hour}:${minutes} ${timeOfDay}`
    }

    function getCreatedDate() {
        let date = new Date(post.created_at)
        let month = date.getMonth()+1
        let day = date.getDate()
        let year = date.getFullYear()
        return `${month}/${day}/${year}`

    }

    function handleSubjectOnClick(){
        history.push('/posts')
        props.updateFilterSubject(post.subject)
    }

    function handleOnClick(){
        history.push(`/posts/${post.id}`)
    }

    function handleDeleteOnClick(){
        deletingPost({post: post, history: history})
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingPost: info => dispatch(deletingPost(info)),
        updateFilterSubject: subject => dispatch(updateFilterSubject(subject))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))