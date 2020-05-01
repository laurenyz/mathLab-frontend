import React from 'react'

class Calculator extends React.Component {


    render(){
        console.dir(Desmos.GraphingCalculator(<div style = {{width: "600px", height: "400px"}}></div>))
        return(
            <div>
            Calculator
            </div>)
    }
}

export default Calculator