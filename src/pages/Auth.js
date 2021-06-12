import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

function Auth() {
    const [registerLoginToggle, setRegisterLoginToggle] = useState(true);

    return (
        <div className="main" style={{display: "block"}}>
            <h1>get it done</h1>
            {registerLoginToggle ? <Login 
            setRegisterLoginToggle = {setRegisterLoginToggle}
            /> : 
            <Register 
            setRegisterLoginToggle = {setRegisterLoginToggle}
            />}
        </div>
    )
}

export default Auth
