import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Button, FormControl, Paper, TextField } from '@material-ui/core'

export default function Login({setRegisterLoginToggle}) {

    const [successMsg, setSuccessMsg] = useState("");

    let history = useHistory();
    let formData = {};
    const fillForm = (e) => {
        formData[e.target.id] = e.target.value;
        console.log(formData);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formData)
        let data = {
                email: formData.email,
                pass: formData.pass
            }
        let url = 'http://localhost:8000/auth/login'
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        console.log(data, url, options)

        fetch(url, options).then(output => output.json().then(result => 
            {
                if (result.status == "failed") {
                    setSuccessMsg(result.message)
                } else {
                    setSuccessMsg(result.message);
                    localStorage.setItem("token", result.data);
                    history.push("/home")
                }
            }
            ));
        }


    return (
        <Paper elevation={2}  className="authForm-wrapper">
            <form onSubmit={submitHandler}  className="authForm">
                <FormControl>
                    <TextField 
                    id="email"
                    label="Email"
                    aria-describedby="my-helper-text" 
                    autoFocus = "true"
                    required = "true"
                    onChange = {fillForm}/>
                </FormControl>
                <FormControl>
                    <TextField 
                    id="pass" 
                    label="Password"
                    required = "true"
                    onChange = {fillForm}/>
                </FormControl>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary"
                    >Login</Button>
            </form>
            <p>New here?
                    <span
                    style = {{textDecoration: "underline", display: "block", cursor: "pointer"}}
                    onClick={() => setRegisterLoginToggle(false)}
                    >Register</span>
            </p>
            <p>{successMsg}</p>
        </Paper>
    )
}
