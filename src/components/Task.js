import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import { Box, Card, CardContent, Checkbox, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles({
        root: {
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: '#330745',
            padding: "2%",
            margin: "2% auto",
            width: "500px"
        },
        checkBox: {
            fill: '#330745'
        },
        label: {
            width: "500px"
        }
    })

function Task({task, deleteTask, updateFormToggle, setMessage, displayMessage}) {

    const classes = useStyles();

    const editTaskStatus = (status) => {
        task.isFinished = !status;
        let updatedTask = {...task};
        const url = "http://localhost:8000/tasks/status"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(updatedTask)
        };
        fetch(url, options)
        .then(result => result.json()
        .then(output => {
            if (output.status == "success") {
                if (updatedTask.isFinished) {
                    setMessage(output.message)
                } else {
                    setMessage("Back to the drawing board.")
                }
                displayMessage();
            } else {
                console.log(output.message)
            }
        }))
        .catch(err => console.log(err));
    }

    return (
        <Grid item>
            <Card className = {classes.root}>
                <CardContent>
                    <FormControlLabel
                        control={
                            <Checkbox
                                className = {classes.checkBox}
                                onChange={() => editTaskStatus(task.isFinished)}
                                checked = {task.isFinished ? true : false}
                                />
                            }
                        label={task.title}
                        labelPlacement="left"
                        style={task.isFinished ? {textDecoration: "line-through", color:"darkgray"} : null}
                        classes={classes.label}
                        />
                    <Box>
                        {!task.isFinished && <EditOutlined  onClick={() => updateFormToggle("edit", task)}>Edit</EditOutlined>}
                        <DeleteOutline onClick={() => deleteTask(task._id)}>Delete</DeleteOutline>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Task;
