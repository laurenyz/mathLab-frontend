import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletingPost, updateFilterSubject, updateSearchTerm } from '../redux/actions'
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import CardActionArea from '@material-ui/core/CardActionArea'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { v4 as uuidv4 } from 'uuid'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
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
                </CardContent>    
            </CardActionArea>
                <CardContent>
                <Grid container>
                    {post.tags.length !==0 && post.tags[0].tagline!== "" ? 
                  post.tags.map(tag => <Grid key={uuidv4()} style={{marginRight: "5px"}} item>
                      <Link 
                        key={tag.id}
                        component="button"
                        variant="body2"
                        value={tag.tagline}
                        onClick={(event) => {
                            handleTagOnClick(event)
                        }}
                        >
                        {tag.tagline}
                        </Link>  </Grid>)
                  : null}
                </Grid>
                </CardContent>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                    <Button onClick = {handleSubjectOnClick}>{post.subject}</Button>
                    </Grid>
                    <Grid item>
                    {(user && user.id === post.user.id?
                        <IconButton aria-label="delete" onClick = {handleDeleteOnClick}>
                            <DeleteIcon />
                        </IconButton>
                    : null
                )}
                {( props.showReplies ?
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
                    </Grid>
                </Grid>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {post.replies.length>0?
                arrangeRepliesByUpvotes().map(reply => {
                    return(
                        <CardContent key = {reply.id}>
                            <Divider  />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {(reply.reply_text.length > 100 ? `${reply.reply_text.substring(0, 100)}...` : reply.reply_text)}  
                            </Typography>
                        </CardContent>
                        )
                    })
                    :   <CardContent>
                            <Divider  />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Be the first to leave a reply!  
                            </Typography>
                        </CardContent>
                }
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

    function handleTagOnClick(event){
        history.push('/posts')
        props.updateSearchTerm(event.target.value)
        
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
        updateFilterSubject: subject => dispatch(updateFilterSubject(subject)),
        updateSearchTerm: tag => dispatch(updateSearchTerm(tag))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostCard))