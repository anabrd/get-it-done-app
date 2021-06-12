import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Grid } from '@material-ui/core';
import Task from './Task'
import Tasks from '../pages/Tasks';

function TaskWrapper({tasks, updateFormToggle, deleteTask, setMessage, displayMessage}) {

    const [taskList, setTaskList] = useState(tasks);

    useEffect(() => {
        setTaskList(tasks)
    }, [Tasks])

    function onDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(taskList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTaskList(items);
    }

    let draggableComp = taskList.map((taskItem, index) => {
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
        <Grid container justify="center" 
        spacing={1}  
        style = {{padding: "3%"}}>
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
        </Grid>
    )
}

export default TaskWrapper
