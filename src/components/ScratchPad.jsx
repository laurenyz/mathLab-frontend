import React from 'react'
import '../ScratchPad.css'

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
    }

    handleOnChange = event => {
        this.setState({text: event.target.value})
    }
    
    render() {
          return (
            <textarea
              value={this.state.text}
              onChange={this.handleOnChange}
            />
          )
        }

}

export default ScratchPad

// import React, { Component } from 'react'
// import '../ScratchPad.css'

// class ScratchPad extends Component {
//   state = { text: '' }

//   componentDidMount() {
//     fetch('http://localhost:3000/scratchpads/1')
//     .then(data => {data.json()
//     .then(res => {
//           console.log(res)
//         this.setState({ text: res.scratchpad_text })
//       })
//     })
//   }
  
//   handleChange = e => {
//     this.setState({ text: e.target.value })
//   }

//   render() {
//     return (
//       <textarea
//         value={this.state.text}
//         onChange={this.handleChange}
//       />
//     )
//   }
// }

// export default ScratchPad