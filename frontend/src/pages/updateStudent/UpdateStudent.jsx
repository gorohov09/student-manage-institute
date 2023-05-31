import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import * as React from 'react';
import Button from '@mui/material/Button';
import {Spinner} from "react-bootstrap";

import { ThemeProvider  } from '@mui/material/styles';
import theme from '../../components/muiTheme.jsx';

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './updateStudent.scss';
import useInstituteService from "../../services/InstituteService";

const UpdateStudentPage = ({setIsAuth}) => {

    const {studentId, groupId} = useParams();
    console.log(studentId);
    console.log(groupId);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [patronymic, setPatronymic] = useState();
    const [birthday, setBirthday] = useState();

    const navigate = useNavigate();

    const {getStudentById, updateStudent} = useInstituteService();

    useEffect(() => {
		getStudentById(studentId)
				.then(data => {
                    setData(data);
                    setLoading(false);
                    setLastName(data?.student.lastName);
                    setFirstName(data?.student.firstName);
                    setPatronymic(data?.student.patronymic);
                    setBirthday(data?.student.birthday)
                });
				
	}, []);

    const onHandleSubmit = async(e) => {
        e.preventDefault();

        if (lastName == null || lastName === '' || firstName == null || firstName === ''){
            return;
        }

        const data = await updateStudent(studentId, {
			lastName: lastName,
		  	firstName: firstName,
            patronymic: patronymic,
            birthday: birthday,
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
    console.log(data);

    return (

        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="addStudent">
                        {
                            data != null ?
                            <div className="addStudent__form">
                                <h2>Обновление студента</h2>
                                <form onSubmit={onHandleSubmit} className="course__form"> 
                                    <div className="course_name input">
                                        <label>
                                            <p>Фамилия</p>
                                            <input type="text" onChange={e => setLastName(e.target.value)} value={lastName}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Имя</p>
                                            <input type="text" onChange={e => setFirstName(e.target.value)} value={firstName}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Отчество</p>
                                            <input type="text" onChange={e => setPatronymic(e.target.value)} value={patronymic}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Дата рождения</p>
                                            <input type="text" onChange={e => setBirthday(e.target.value)} value={birthday.split('T')[0]}/>
                                        </label>
                                    </div>
                                    <div className="button input">
                                        <ThemeProvider theme={theme}>
                                            <Button variant="contained" size="medium" type="submit">Сохранить изменения</Button>
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

export default UpdateStudentPage;