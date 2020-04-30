import React from 'react'
import Desmos from 'desmos'

class Calculator extends React.Component {

    // displayCalculator = (elt) => {
    //     const calculator = Desmos.GraphingCalculator(elt)
    //     calculator.setExpression({ id: 'graph1', latex: 'y=x^2' })

    // }

    render(){
        console.dir(Desmos.GraphingCalculator(<div style = {{width: "600px", height: "400px"}}></div>))
        return(
            <div>
            Calculator
            
            {/* {this.displayCalculator(<div style = {{width: "600px", height: "400px"}}></div>)} */}
            
            </div>)
    }
}

export default Calculator