import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import * as React from 'react';
import Button from '@mui/material/Button';
import {Spinner} from "react-bootstrap";

import { ThemeProvider  } from '@mui/material/styles';
import theme from '../../components/muiTheme.jsx';

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import './addStudentPage.scss';
import useInstituteService from "../../services/InstituteService";

const AddStudentPage = ({setIsAuth}) => {

    const {groupId} = useParams()

    const [loading, setLoading] = useState(false);
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [patronymic, setPatronymic] = useState();
    const [birthday, setBirthday] = useState();

    const navigate = useNavigate();

    const {createStudent} = useInstituteService();

    const onHandleSubmit = async(e) => {
        e.preventDefault();

        if (lastName == null || lastName === '' || firstName == null || firstName === ''){
            return;
        }

        const data = await createStudent({
			lastName: lastName,
		  	firstName: firstName,
            patronymic: patronymic,
            birthday: birthday,
            groupId: groupId
		});

        console.log(data);
		if (data?.status === 500){
			console.log('Очистка формы')
			e.target.reset(); 
		}
		else{
			navigate(`/groupSingle/${groupId}`)
		}
    }

    return (

        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="addStudent">
                        {
                            !loading ?
                            <div className="addStudent__form">
                                <h2>Добавление студента в группу</h2>
                                <form onSubmit={onHandleSubmit} className="course__form"> 
                                    <div className="course_name input">
                                        <label>
                                            <p>Фамилия</p>
                                            <input type="text" onChange={e => setLastName(e.target.value)}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Имя</p>
                                            <input type="text" onChange={e => setFirstName(e.target.value)}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Отчество</p>
                                            <input type="text" onChange={e => setPatronymic(e.target.value)}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Дата рождения</p>
                                            <input type="text" onChange={e => setBirthday(e.target.value)}/>
                                        </label>
                                    </div>
                                    <div className="button input">
                                        <ThemeProvider theme={theme}>
                                            <Button variant="contained" size="medium" type="submit">Добавить</Button>
                                        </ThemeProvider>
                                    </div>     
                                </form>
                               
                            </div>
                            : 
                            <>
                                <Spinner style={{'color':'#6439ff'}}/>
                            </>
                        }
                    </div>
            </div>
        </div>
    )
}

export default AddStudentPage;