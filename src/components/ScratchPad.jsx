import React from 'react'
import '../ScratchPad.css'
import ActionCable from 'actioncable'
import {withRouter} from 'react-router-dom'
// import {MathFieldComponent} from 'react-mathlive'
import { addStyles, EditableMathField } from 'react-mathquill'
import EditableMathExample from './mathquillExample'

addStyles()

class ScratchPad extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: "",
            scratchpadId: null
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/scratchpads/${this.props.match.params.url}`)
        .then(resp => resp.json())
        .then(scratchpad => {
          console.log("hitting component did mount")
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

    // handleOnChange = event => {
    //   this.setState({ text: event.target.value })
    //   this.subscription.send({ text: event.target.value, id: this.state.scratchpadId })
    // }

    onMathChange(mathText) {
      console.log(mathText);
    }
    
    render() {
      console.log(this.subscription)
          return (
            // <div style = {{width: "400px", height: "400px", border: "solid 2px", margin: "0% 30%"}}>
            <div>
            
             <EditableMathField
                className = "mathquill-textbox mathquill-editable"
                latex={this.state.text} 
                style = {{width: "400px", height: "400px"}}
                onChange={mathField => {
                this.setState({ text: mathField.latex() })
              }}/>

              {/* <textarea
              value={this.state.text}
              onChange={this.handleOnChange}
              // this.setState({ mathField.latex() }, () => {})
            /> */}
            {/* <EditableMathExample /> */}

            {/* <MathFieldComponent 
              latex="f(x)=\\log _10 x"
              onChange={this.onMathChange} */}
            {/* /> */}
            </div>
          )
        }

    componentWillUnmount(){
      // this.subscription.unsubscribe()
    }

}

export default withRouter(ScratchPad)