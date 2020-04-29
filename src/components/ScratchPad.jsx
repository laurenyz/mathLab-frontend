import React from 'react'
import '../ScratchPad.css'
import ActionCable from 'actioncable'
import {withRouter} from 'react-router-dom'

class ScratchPad extends React.Component {

    constructor() {
        super()
        this.state = {
            text: "",
            scratchpadId: null
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/scratchpads/${this.props.match.params.url}`)
        .then(resp => resp.json())
        .then(scratchpad => {
          console.log(scratchpad)
          this.setState({text: scratchpad.scratchpad_text, scratchpadId: scratchpad.id})
          const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
          this.subscription = cable.subscriptions.create({ channel: 'ScratchpadsChannel', room: scratchpad.id }, {
            received: this.handleReceiveNewText
          })
        })
    }

    handleReceiveNewText = ({ text }) => {
      if (text !== this.state.text) {
        this.setState({ text })
      }
    }

    handleOnChange = event => {
      this.setState({ text: event.target.value })
      this.subscription.send({ text: event.target.value, id: this.state.scratchpadId })
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