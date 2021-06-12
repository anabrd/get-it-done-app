import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, makeStyles } from '@material-ui/core';

// Add task title as editable value instead of placeholder

function Form(props) {

    let activeContent;

    if (props.currentTask) {
        activeContent = {
        title: "Edit Task",
        text: "Change of plans?",
        label: props.currentTask.title,
        placeholder: props.currentTask.title,
        submitBtn: "Save Changes",
        cancelBtn: "Cancel"
        }
    } else {
        activeContent = {
            title: "Add New Task",
            text: "What's your plan?",
            label: "Enter Task",
            placeholder: "What's your plan?",
            submitBtn: "Add Task",
            cancelBtn: "Cancel"
        }
    }

    // const [activeContent, setActiveContent] = useState(props.formAction == "edit" ? edit : add);

    // RECORDING FORM INPUT
    function fillForm(e) {
        if (props.formAction == "add") {
            props.setNewTask({title: e.target.value, isFinished: false});
        } else {
            props.setNewTask({...props.currentTask, title: e.target.value});
        }
    }
    return (
        <Dialog 
        open={props.setFormToggle}
        fullWidth="true">
            <DialogTitle>{activeContent.title}</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus = {true}
                    fullwidth = {true}
                    id="standard-basic" 
                    label= {activeContent.text}
                    placeholder= {activeContent.label}
                    onChange={fillForm} />
            </DialogContent>
            <DialogActions>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    onClick={props.formAction == "add" ? props.addTask : props.editTaskTitle}
                    >{activeContent.submitBtn}</Button>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => props.setFormToggle(false)}
                    >{activeContent.cancelBtn}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Form;
