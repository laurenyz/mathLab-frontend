import React from 'react'
import { addingReply } from '../redux/actions'
import { connect } from 'react-redux'
import { TextField, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    replyForm: {
        paddingTop: 20,
        paddingBottom: 20
      },
  });

class NewReplyForm extends React.Component {

    constructor(){
        super()
        this.state = {
            text: ""
        }
    }

    handleOnChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleOnSubmit = (event) => {
        event.preventDefault()
        this.props.addingReply({replier_id: this.props.user.id, post_id: this.props.post.id, reply_text: this.state.text})
        this.setState({
            text: ""
        })
    }
    

    render() {
        const { classes } = this.props
        return(<div>
            <form className = {classes.replyForm} onSubmit = {this.handleOnSubmit}>
                <Grid container justify="flex-start" alignItems="flex-end">
                    <Grid item xs={12} sm={10} md={8} >
                    <TextField
                    id="filled-multiline-static"
                    label="Add Reply"
                    fullWidth
                    multiline
                    rows={10}
                    variant="filled"
                    placeholder="Here comes an ingenius reply..."
                    value = {this.state.text}
                    name = "text"
                    onChange = {this.handleOnChange}
                />
                    </Grid>
                    <Grid item>
                    <Button type="submit">Post Reply</Button>
                    </Grid>
                </Grid>
                
                
            </form>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addingReply: reply => dispatch(addingReply(reply))
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(NewReplyForm))