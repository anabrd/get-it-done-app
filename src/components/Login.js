import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

export default function Login({setRegisterLoginToggle}) {

    const [msg, setMsg] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loader, setLoader] = useState(false)

    let history = useHistory();
    let formData = {};

    // Toggle password visibility
    let handleClickShowPassword = () => {
        setShowPass(prevValue => !prevValue);
    }

    // Firm form
    const fillForm = (e) => {
        formData[e.target.id] = e.target.value;
        console.log(formData);
    }

    // Submit form
    const submitHandler = (e) => {
        e.preventDefault();
        setLoader(true);
        setMsg("");
        console.log(formData)
        let data = {
                email: formData.email,
                pass: formData.pass
            }
        if (!data.pass) {
            data.pass = ""
        }
        let url = 'https://getitdone-backend-app.herokuapp.com/auth/login'
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, options).then(output => output.json().then(result => 
            {
                if (result.status === "failed") {
                    setMsg(result.message)
                } else {
                    setMsg(result.message);
                    localStorage.setItem("token", result.data);
                    history.push("/home")
                }
                setLoader(false);
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
                    autoFocus = {true}
                    required ={true}
                    onChange = {fillForm}/>
                </FormControl>
                <FormControl>
                    <InputLabel 
                    htmlFor="pass" 
                    required = {true}>
                        Password
                    </InputLabel>
                    <Input
                    id = "pass" 
                    label = "Password"
                    onChange = {fillForm}
                    value = {formData.pass}
                    autoComplete="current-password"
                    type={showPass ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            >
                            {showPass ?  <Visibility /> :
                            <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }/>
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
            <p>{msg}</p>
            {loader && <CircularProgress color="secondary" />}
        </Paper>
    )
}
