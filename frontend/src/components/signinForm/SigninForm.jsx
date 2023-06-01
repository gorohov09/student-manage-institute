import Button from '@mui/material/Button';

import * as React from 'react';

import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import './signinForm.scss';

import { ThemeProvider  } from '@mui/material/styles';
import theme from '../muiTheme.jsx';

import BasicModal, { InformModal } from '../modal/Modal';
import useInstituteService from '../../services/InstituteService';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

const SigninForm = ({setToken}) => {
    const {registerUser, error, clearError} = useInstituteService();
    const navigate = useNavigate();

    const [value, setValue] = React.useState('female');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const [firstName, setFirstName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState(); 
    const [itsOk, setItsOk] = useState(false);
    const [isRequest, setIsRequest] = useState(false);

    const handleSubmit = async e => {
		e.preventDefault();
        setIsRequest(true);
		const data = await registerUser({
            name: firstName,
			email,
		  	password,
            isTeacher: value === 'teacher' ? true : false
		});

		if (data?.status === 500){
			console.log('Очистка формы')
			e.target.reset(); 
		}
		else{
			setToken("data.token");
            setItsOk(true);
		}
        setIsRequest(false);
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
        <div className="form signin_form">
            <form onSubmit={handleSubmit}>
                <div className="name input">
                    <label>
                        <p>Имя</p>
                        <input type="text" onChange={e => setFirstName(e.target.value)}/>
                    </label>
                </div>
                <div className="email input">
                <FormControl>
                    <p>Вы учитель?</p>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                         name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                    <FormControlLabel value="teacher" control={<Radio />} label="Да" />
                    <FormControlLabel value="student" control={<Radio />} label="Нет" />
                    </RadioGroup>
                </FormControl>
                </div>
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
                <div className="button input"
                disabled={isRequest}>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" size="medium" type="submit">Регистрация</Button>
                    </ThemeProvider>
                    
                </div>
                <InformModal isOpen={itsOk} 
                header={'Регистрация прошла успешно.'} 
                text={'Авторизуйтесь для начала работы, пожалуйста.'}/>
                {errorMessage}
            </form>
        </div>
    )
}

export default SigninForm;