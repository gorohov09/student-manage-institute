import {useState} from "react";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoginForm from '../loginForm/LoginForm';
import SigninForm from '../signinForm/SigninForm';
import AppHeader from '../appHeader/AppHeader';

import { ThemeProvider  } from '@mui/material/styles';
import theme from '../muiTheme.jsx';
import './authForm.scss';



const AuthForm = ({setToken, setIsAuth}) => {

    const [isLoginForm, setIsLoginForm] = useState(true);

    return (
        <>
        {/* <AppHeader/> */}
        <div className="auth_form__container">
        
            <div className="auth_form__form">
                <div className="change_form">
                    <ThemeProvider theme={theme}>
                        <ButtonGroup variant="contained" size="large" aria-label="outlined button group">
                            <Button disabled={isLoginForm} onClick={() => setIsLoginForm(true)}>Log-in</Button>
                            <Button disabled={!isLoginForm} onClick={() => setIsLoginForm(false)}>Sign-in</Button>
                        </ButtonGroup>
                    </ThemeProvider>
                </div>
                
                {isLoginForm ? <LoginForm setToken={setToken} setIsAuth={setIsAuth}/> : <SigninForm setToken={setToken}/>}
                
            </div>
        </div>
        </>
    )
} 

export default AuthForm;