import { useState } from 'react'
import { Button, CircularProgress, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Paper, TextField } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

function Register({setRegisterLoginToggle}) {

    const [passError, setPassError] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [passErrMsg, setPassErrMsg] = useState("");
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loader, setLoader] = useState(false)

    let formData = {};

    let handleClickShowPassword = () => {
        setShowPass(prevValue => !prevValue);
    }

    const fillForm = (e) => {
        formData[e.target.id] = e.target.value;
        setPassError(false);
        setLoginError(false);
        setPassErrMsg("");
        console.log(formData);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setPassErrMsg("");
        setLoginErrMsg("");
        setSuccessMsg("")
        setLoader(true);
        let data = {
                email: formData.email,
                pass: formData.pass
            }
        if (!data.pass) {
            setPassError(true);
            setPassErrMsg("Please enter a password.");
        } else if (data.pass !== formData.passConf) {
            setPassError(true);
            setPassErrMsg("Please make sure the passwords match.");
        } else {
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
                        setLoginError(true);
                        setLoader(false)
                    } else {
                        setRegistered(true);
                        setSuccessMsg("Welcome aboard! Redirecting to login...");
                        setTimeout(() => {
                            setRegisterLoginToggle(true);
                            setLoader(false)
                        }, 2000);
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
                        autoFocus="true"
                        required="true"
                        error={loginError}
                        helperText={loginErrMsg}
                        onChange={fillForm}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel 
                        htmlFor="pass" 
                        required={true}>
                            Password
                        </InputLabel>
                        <Input
                        id="pass" 
                        label="Password"
                        onChange = {fillForm}
                        value = {formData.pass}
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
                    <FormControl>
                        <InputLabel 
                        htmlFor="passConf" 
                        required = {true}>
                            Confirm Password
                        </InputLabel>
                        <Input
                        id="passConf" 
                        label="Confirm Password"
                        error={passError}
                        helperText={passErrMsg}
                        onChange = {fillForm}
                        value = {formData.passConf}
                        type={showPass ? 'text' : 'password'}
                        />
                        <FormHelperText id="passConfErr">{passErrMsg}</FormHelperText>
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
                {loader && <CircularProgress color="secondary" />}
            </Paper>
    )
}

export default Register

