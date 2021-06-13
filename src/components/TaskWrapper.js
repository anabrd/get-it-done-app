import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box } from '@material-ui/core';
import Task from './Task';

function TaskWrapper({tasks, setTasks, updateFormToggle, deleteTask, setMessage, displayMessage}) {

    function onDragEnd(result) {
        if (!result.destination) return;

        const reorderedTasks = Array.from(tasks);
        const [reorderedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, reorderedTask);
        console.log('reorderedtasks before foreach', reorderedTasks);

        reorderedTasks.forEach((task, index) => task.orderId = index);

        console.log('reorderedtasks after foreach', reorderedTasks);
        setTasks(reorderedTasks);

        // Send new order to backend
        const url = "https://getitdone-backend-app.herokuapp.com/tasks/order"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(reorderedTasks)
        };
        fetch(url, options)
        .then(result => result.json()
        .then(output => {
            if (output.status == "success") {
                console.log("OK")
            } else {
                console.log("Not OK")
            }
        }))
        .catch(err => console.log(err));
    }

    let draggableComp = tasks.map((taskItem, index) => {
                    return (
                        <Draggable key={taskItem._id} draggableId={taskItem._id} index={index}>
                            {(provided) => (
                                <div key={taskItem._id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Task 
                                    task={taskItem} 
                                    deleteTask = {deleteTask}
                                    updateFormToggle={updateFormToggle}
                                    setMessage={setMessage}
                                    displayMessage={displayMessage}
                                    />
                                </div>
                            )}
                        </Draggable>
                        );
                    })

    return (
        <Box 
            container 
            justify="center"
            style = {{padding: "3%"}}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {draggableComp}
                        {provided.placeholder}
                    </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )
}

export default TaskWrapper
