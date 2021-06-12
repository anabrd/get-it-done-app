import React from 'react'
import { Typography, Fade } from '@material-ui/core'

function Message({message, showMessage}) {

    let content = message;

    return (
        <Fade in={showMessage} className="message">
            <Typography>
                {content}
            </Typography>
        </Fade>
    )
}

export default Message