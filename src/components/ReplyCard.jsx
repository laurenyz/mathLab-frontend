import React from 'react'

const ReplyCard = (props) => {
    return(<div className = "card">
         <h3>{props.reply.reply_text}</h3>
    </div>)
}

export default ReplyCard