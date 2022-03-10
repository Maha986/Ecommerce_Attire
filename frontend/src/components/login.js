import React, { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import userContext from "../contexts/userContext/userContext";

import "./login.css";

export const Login = (props) => {

    const context = useContext(userContext);
    const { login, userAuthres ,setUserAuthres } = context;

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        userdata["password"] = values.password;
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        userdata["password"] = values.password;

    }, [values])
    function close() {
        props.close();
        props.setstate(false);
    }

    const [userdata, setdata] = useState({
        email: "",
        password: values.password
    })

    const inputEvent = (event) => {
        const { name, value } = event.target;
        setdata((preval) => {
            return {
                ...preval,
                [name]: value,
            }
        })
    };

    const [openError, setOpenError] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };
    const [alertdisplay, setalertdisplay] = useState("none")
    // console.log(alertdisplay)
    // const [userpassed, setuserpassed] = useState(false)
    // var temp_user = "";
    const finduser = async (e) => {
        e.preventDefault();
        // console.log(props.user)
        const response = await login(userdata.email, userdata.password);
        if(response.type==="success")
        {
            localStorage.setItem("authToken",response.message);
            // console.log(userAuthres);
            props.close();
            props.opensuccess(true)
        }
        else
        {
            await setOpenError(true);
            document.getElementById('error_message').innerText=response.message;
        }
        // console.log(response);
        // if (Object.values(props.users).length > 0) {

        //     Object.values(props.users).forEach(user => {
        //         if (user["email"] === userdata.email && user["password"] === userdata.password) {
        //             // console.log("ern",user["email"])
        //             setalertdisplay("none")
        //             setuserpassed(true);
        //             temp_user = user;
        //         }
        //     });

        //     if (temp_user !== "") {
        //         props.setCurrentUser(temp_user);
        //         props.close();
        //         props.opensuccess(true)
        //     }
        //     else {
        //         setalertdisplay("flex");

        //     }
        // }


    }
    // useEffect(() => {
    //     if(userAuthres!==null)
    //     {
    //         console.log(userAuthres);
    //     }
    // }, [userAuthres])
    
    return (
        <>
            <form className='form'>
                <div style={{ display: "flex", justifyContent: "right" }}>
                    <IconButton
                        onClick={close}
                    >
                        <CloseIcon sx={{ color: "#7e5c96" }} />
                    </IconButton>
                </div>
                <h2 className='login-head br-name'>LOGIN</h2>

                <div style={{ margin: '85px auto', textAlign: 'center' }}>
                    <Alert severity="error" sx={{ marginBottom: "15px", display: alertdisplay }}>Email or password is invalid.</Alert>
                    <TextField value={userdata.email} color="secondary" name="email" onChange={inputEvent} sx={{ width: '80%' }} id="outlined-basic" label="Email" variant="outlined" required={true} style={{ backgroundColor: "white" }} />
                    <br />

                    <FormControl sx={{ m: 1, width: '80%' }} color="secondary" variant="outlined" style={{ backgroundColor: "white" }}>
                        <InputLabel htmlFor="outlined-adornment-password" required={true} >Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <br />
                    <Button type="submit" onClick={finduser} color="secondary" className='login-button' variant="contained" sx={{ bgcolor: '#9a78b3', marginTop: "8px" }} >LOGIN</Button>
                    <p>Don't have an account?</p>
                    <Button variant="contained" color="secondary" sx={{ bgcolor: '#9a78b3', color: "white" }} onClick={props.user_signup_clicked}>Sign Up</Button>
                </div>
                <Snackbar open={openError} autoHideDuration={1500} onClose={handleClose}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert id="error_message" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    
                </Alert>
            </Snackbar>
            </form>
        </>
    )
}

