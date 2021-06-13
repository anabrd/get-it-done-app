import { useState } from 'react'
import { Button, FormControl, Input, InputLabel, Paper , TextField} from '@material-ui/core'

function Register({setRegisterLoginToggle}) {

    const [passError, setPassError] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passErrMsg, setPassErrMsg] = useState("");
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [formData, setFormData] = useState({email:"", pass:"", passConf:""});

    const fillForm = (e) => {
        formData[e.target.id] = e.target.value;
        setPassError(false);
        setLoginError(false);
        setPassErrMsg("");
        console.log(formData);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (formData.pass !== formData.passConf) {
            setPassError(true);
            setPassErrMsg("Please make sure the passwords match.");
        } else {
            let data = {
                    email: formData.email,
                    pass: formData.pass
                }
            let url = 'https://getitdone-backend-app.herokuapp.com/auth/register'
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            console.log(options)

            fetch(url, options).then(output => output.json().then(result => 
                {
                    if (result.status == "failed") {
                        setLoginErrMsg(result.message);
                        setLoginError(true)
                    } else {
                        setRegistered(true);
                        setSuccessMsg(result.message + "✅ Redirecting to login page...");
                        setTimeout(() => {
                            setRegisterLoginToggle(true);
                        }, 3000);
                    }
                }));
        }
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
                        error={loginError}
                        helperText={loginErrMsg}
                        onChange = {fillForm}/>
                    </FormControl>
                    <FormControl>
                        <TextField 
                        id="pass" 
                        label="Password"
                        required = "true"
                        onChange = {fillForm}/>
                    </FormControl>
                    <FormControl>
                        <TextField 
                        id="passConf" 
                        label="Confirm Password"
                        required = "true"
                        error={passError}
                        helperText={passErrMsg}
                        onChange = {fillForm}/>
                    </FormControl>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="secondary"
                        onClick={() => submitHandler}
                        >Register</Button>
                </form>
                <p>Have an account?
                        <span
                        style = {{textDecoration: "underline", display: "block", cursor: "pointer"}}
                        onClick={() => setRegisterLoginToggle(true)}
                        >Log In</span>
                </p>
                <p>{successMsg}</p>
            </Paper>
    )
}

export default Register

