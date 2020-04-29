import React from 'react'
import '../ScratchPad.css'
import ActionCable from 'actioncable'
import {withRouter} from 'react-router-dom'

class ScratchPad extends React.Component {

    constructor() {
        super()
        this.state = {
            text: ""
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/scratchpads/1')
        .then(resp => resp.json())
        .then(scratchpad => this.setState({text: scratchpad.scratchpad_text}))

        const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
        this.subscription = cable.subscriptions.create('ScratchpadsChannel', {
          received: this.handleReceiveNewText
        })
    }

    handleReceiveNewText = ({ text }) => {
      if (text !== this.state.text) {
        this.setState({ text })
      }
    }

    handleOnChange = event => {
      this.setState({ text: event.target.value })
      this.subscription.send({ text: event.target.value, id: 1 })
    }
    
    render() {
      console.log(this.props)
          return (
            <textarea
              value={this.state.text}
              onChange={this.handleOnChange}
            />
          )
        }

}

export default withRouter(ScratchPad)