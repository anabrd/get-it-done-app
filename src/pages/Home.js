import TaskWrapper from '../components/TaskWrapper';
import Form from '../components/Form';
import Message from '../components/Message';
import '../App.css';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import '@fontsource/raleway';
import { useHistory } from 'react-router-dom';

import React from 'react'

function Tasks() {

    const [formToggle, setFormToggle] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({});
    const [currentTask, setCurrentTask] = useState();
    const [formAction, setFormAction] = useState(null);
    const [loader, setLoader] = useState(true);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    let history = useHistory();

    // TOGGLING ADD/EDIT FORM
    const updateFormToggle = (action, task) => {
        setFormAction(action);
        setCurrentTask(task);
        setFormToggle(prevState => !prevState);
    }

    // MESSAGE DISPLAY
    const displayMessage = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    // FETCHING TASKS
    useEffect(() => {
        const url = "https://getitdone-backend-app.herokuapp.com/tasks/all"
        const options = {
            headers: {
                'x-auth-token': token
            }
        }

        fetch(url, options).then(result => result.json()
        .then(output => {
            if (output.status == "success") {
                // Rearrange fetched tasks according to their orderID
                output.data.sort((a,b) => (a.orderId > b.orderId) ? 1 : ((b.orderId > a.orderId) ? -1 : 0))
                setTasks(output.data);
                setLoader(false);
            } else if (output.status == "failed") {
                setLoader(false);
                history.push('/auth');
            }
        }))
        .catch(err => {
            console.log(err)
            setLoader(false)
            setMessage("Sorry, there seems to be something wrong with your request.");
        });
    }, []);

    // ADDING NEW TASK
    const addTask = () =>  {
        setFormToggle(false);
        const url = "https://getitdone-backend-app.herokuapp.com/tasks/new"
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(newTask)
        };
    fetch(url, options)
    .then(result => result.json()
        .then(output => {
            if (output.status == "success") {
                setTasks([...tasks,output.data]);
                setNewTask({});
                setMessage(output.message);
                displayMessage();
            } else {
                setMessage(output.message);
                displayMessage();
            }
        }
    )).catch(err => setMessage(err));
    }

    // EDITING TASK TITLE
    const editTaskTitle = () => {
        setFormToggle(false);
        const url = "https://getitdone-backend-app.herokuapp.com/tasks/title"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(newTask)
        };
    fetch(url, options)
    .then(result => result.json()
        .then(output => {
            if (output.status === "success") {
                let updatedArr = [];
                updatedArr = [...tasks];
                const index = tasks.findIndex(task => task._id == output.data._id);
                updatedArr[index] = output.data;
                setTasks([...updatedArr]);
                setMessage(output.message);
                displayMessage();
            } else {
                setMessage(output.message)
                displayMessage();
            }
    }))
    .catch(err => console.log(err));
    };

    // DELETING A TASK
    const deleteTask = (id) => {
    const url = "https://getitdone-backend-app.herokuapp.com/tasks/" + id;
    const options = {
        method: "DELETE",
        headers: {
            'x-auth-token': localStorage.getItem("token")
        }
    }
    fetch(url, options)
    .then(result => result.json()
    .then(output => {
        if (output.status === "success") {
            let newTasks;
            newTasks = tasks.filter(task => task._id !== output.data);
            setTasks(newTasks);
            setMessage(output.message)
            displayMessage();
        } else {
            setMessage(output.message)
            displayMessage();
        }
    })).catch(err => console.log(err))
    }

    // LOGOUT

    const logout = () => {
        console.log("logout works")
        localStorage.removeItem("token");
        history.push("/")
    }

    return (
    <>
        <Box className="main" display="flex">
            <div className="info-wrapper">
                <h1>get it done</h1>
                <h3>What's on for today?</h3>
                <p className="tip">(💡 Tip: Rearrange your tasks with drag&drop.)</p>
                <Fab 
                    color="primary" 
                    aria-label="add" 
                    style = {{marginBottom: "3%"}} 
                    onClick={() => updateFormToggle("add")}
                >
                    <AddIcon />
                </Fab>
                <Message 
                    message={message} 
                    showMessage={showMessage}
                />
                <p className="logout" onClick={logout}>Logout</p>
            </div>
            <div className="task-wrapper">
                {loader ?
                <CircularProgress color="secondary" /> : 
                <TaskWrapper 
                    className = "taskWrapper"
                    tasks = {tasks}
                    setTasks = {setTasks}
                    deleteTask = {deleteTask}
                    updateFormToggle = {updateFormToggle}
                    setMessage = {setMessage}
                    displayMessage = {displayMessage}
                />}
            </div>
        </Box>
        {formToggle && 
            <Form 
                setFormToggle={setFormToggle}
                updateFormToggle = {updateFormToggle}
                formAction={formAction}
                currentTask = {currentTask}
                addTask = {addTask}
                editTaskTitle = {editTaskTitle}
                newTask = {newTask}
                tasks = {tasks}
                setNewTask = {setNewTask}
                setTasks = {setTasks}
            />}
    </>
    );
}

export default Tasks
