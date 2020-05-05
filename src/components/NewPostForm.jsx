import React from 'react'
import subjectsData from '../subjects.json'
import {connect} from 'react-redux'
import {addingPost} from '../redux/actions'
import {withRouter} from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const styles = theme => ({
    replyForm: {
        paddingTop: 20,
        paddingBottom: 20
      },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      }, 
  });

class NewPostForm extends React.Component {
    
    constructor() {
        super()
        this.state = {
            text: "",
            subject: "",
            tags: "",
            open: false
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        if(this.state.subject !== ""){
        this.props.addingPost({history: this.props.history, post: {user_id: this.props.user.id, 
            post_text: this.state.text, 
            subject: this.state.subject,
            tags: this.state.tags}})
        this.setState(
            {text: "", 
            subject: "",
            tags: ""
        })} else {
            alert ("Subject cannot be blank.")
        }
    }

    alphabetizedSubjects = (subjectsData) => {
        return subjectsData.subjects.sort((a,b) => (a.name>b.name)? 1: -1)
    }

    render() {
        const { classes } = this.props
        return(<div>
                <Grid container style = {{marginTop: "40px"}}>
                    <Grid item xs={3}/>
                    <Grid item xs={6} >
                    <Grid container direction="column" >
                        <form className = {classes.replyForm} onSubmit = {this.handleOnSubmit}>
                            <Grid item>
                                <TextField
                                id="filled-multiline-static"
                                label="Add Post"
                                fullWidth
                                multiline
                                rows={10}
                                variant="filled"
                                placeholder="Here's something thought provoking...."
                                value = {this.state.text}
                                name = "text"
                                onChange = {this.handleOnChange}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="subject">Subject</InputLabel>
                                        <Select
                                        labelId="choose-subject"
                                        id="choose-subject"
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        onOpen={this.handleOpen}
                                        value={this.state.subject}
                                        name="subject"
                                        onChange={this.handleOnChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.alphabetizedSubjects(subjectsData).map(subject => <MenuItem key = {subject.id} value = {subject.name}>{subject.name}</MenuItem>)}
                                        </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                            <TextField 
                            id="post-tags" 
                            label="Tags" 
                            variant="filled"
                            name="tags" 
                            placeholder="#tag1 #tag2"
                            value={this.state.tags}
                            onChange = {this.handleOnChange}
                            />
                            </Grid>
                            <Grid item>
                                <Button type="submit">Submit</Button>
                            </Grid>
                        </form>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addingPost: post => dispatch(addingPost(post))
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPostForm)))

