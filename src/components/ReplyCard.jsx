import React from 'react'
import { connect } from 'react-redux'
import { deletingReply, addingUpvote, deletingUpvote } from '../redux/actions'
import { Grid, makeStyles, Card, IconButton, CardHeader, CardContent, CardActions, Avatar, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import HUE from '@material-ui/core/colors/green';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 300
    },
    greenUpvoteButton: {
      color: HUE[400]
    },
    // expand: {
    //   transform: 'rotate(0deg)',
    //   marginLeft: 'auto',
    //   transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    //   }),
    // },
    deleteBtn: {
      marginLeft: 'auto'
    },
    // expandOpen: {
    //   transform: 'rotate(180deg)',
    // },
  }));

const ReplyCard = ({reply, deletingUpvote, deletingReply, user, addingUpvote}) => {
    const classes = useStyles();
    // const [expanded, setExpanded] = React.useState(false);
    
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    return( 
        <Card className={classes.root} variant = "outlined" >
            <Grid container justify="space-between">
                <Grid item>
                <CardHeader       
                    avatar={
                    <Avatar alt={reply.replier.username} src={reply.replier.get_image_url} />
                    }
                    title={reply.replier.username}
                    subheader={`${getCreatedDate()} ${getCreatedTime()}`}
                    
                />
                </Grid>
                <Grid item>
                <CardActions disableSpacing>
            
                <Typography>{reply.upvotes.length}</Typography>
                {(reply.upvotes.find(upvote => upvote.voter_id === user.id))?
                    <IconButton aria-label="upvote" onClick = {handleOnClickUpvote}>
                        <ArrowUpwardIcon className={classes.greenUpvoteButton}/>
                    </IconButton>
                :   <IconButton aria-label="upvote" onClick = {handleOnClickUpvote}>
                        <ArrowUpwardIcon />
                    </IconButton>
                }
                </CardActions>
                </Grid>
            </Grid>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {reply.reply_text}
            </Typography>
        </CardContent>    
    <CardActions disableSpacing>
        {(user && user.id === reply.replier.id?
            <IconButton className={classes.deleteBtn} aria-label="delete" onClick = {handleDeleteOnClick}>
                <DeleteIcon />
            </IconButton>
            : null
        )}
    </CardActions>
    </Card>
    )

    function handleOnClickUpvote(){
        if (user){
            if(reply.upvotes.find(upvote => upvote.voter_id === user.id)) {
            const foundUpvote = reply.upvotes.find((upvote => upvote.voter_id === user.id))
            deletingUpvote(foundUpvote)
            }
             else {
            addingUpvote({reply_id: reply.id, voter_id: user.id})
            }
        } else {
            alert("You must be signed in to upvote a reply!")
        }  
    }

    function getCreatedTime() {
    let date = new Date(reply.created_at)
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
        let date = new Date(reply.created_at)
        let month = date.getMonth()+1
        let day = date.getDate()
        let year = date.getFullYear()
        return `${month}/${day}/${year}`

    }

    function handleDeleteOnClick() {
        deletingReply(reply)
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletingReply: reply => dispatch(deletingReply(reply)),
        addingUpvote: upvote => dispatch(addingUpvote(upvote)),
        deletingUpvote: upvoteId => dispatch(deletingUpvote(upvoteId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyCard)