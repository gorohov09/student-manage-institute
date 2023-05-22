import Button from '@mui/material/Button';

import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useCourseService from '../../services/CourseService.jsx';
import { ThemeProvider  } from '@mui/material/styles';
import theme from '../muiTheme.jsx';

import './loginForm.scss'

const LoginForm = ({setToken, setIsAuth}) => {
    const {loginUser, error, clearError} = useCourseService();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
		e.preventDefault();
        
		const data = await loginUser({
			email: email,
		  	password: password
		});
        console.log(data);
		if (data?.status === 500){
			console.log('Очистка формы')
			e.target.reset(); 
		}
		else{
			setToken(data.token);
			setIsAuth(true);
			if (data.typeUser === 'teacher')
				navigate("/");
			else
				navigate("/student")
		}
		
	}

    useEffect(() => {
        clearError();
    }, []);

    let errorMessage = (
        <div>
            <span style={{'color': '#ffffff', 'font-size': '1em'}}>
                Произошла ошибка
            </span>
        </div>
    )
    errorMessage = error ? errorMessage : null;

    return(
        <div className="form login_form">
            <form onSubmit={handleSubmit}> 
                <div className="email input">
                    <label>
                        <p>Почта</p>
                        <input type="text" onChange={e => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div className="password input">
                    <label>
                        <p>Пароль</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                </div>
                <div className="button input">
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" size="medium" type="submit">Авторизация</Button>
                    </ThemeProvider>
                </div>     
                {errorMessage}
            </form>
        </div>
    )
}

export default LoginForm;