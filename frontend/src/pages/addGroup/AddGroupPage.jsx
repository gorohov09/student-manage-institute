import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import * as React from 'react';
import Button from '@mui/material/Button';
import useCourseService from "../../services/CourseService";
import {Spinner} from "react-bootstrap";

import { ThemeProvider  } from '@mui/material/styles';
import theme from '../../components/muiTheme.jsx';

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import './addGroupPage.scss';

const AddGroupPage = ({setIsAuth}) => {

    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState();
    const [specialization, setSpecialization] = useState();
    const navigate = useNavigate();

    const {saveCourse} = useCourseService();

    const onHandleSubmit = async(e) => {
        e.preventDefault();

        if (number == null || number === '' || specialization == null || specialization === ''){
            return;
        }

        const data = await saveCourse({
			name: number,
		  	description: specialization
		});
        console.log(data);
		if (data?.status === 500){
			console.log('Очистка формы')
			e.target.reset(); 
		}
		else{
			navigate("/groups")
		}
    }

    return (

        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="addGroup">
                        {
                            !loading ?
                            <div className="addGroup__form">
                                <h2>Добавление группы</h2>
                                <form onSubmit={onHandleSubmit} className="course__form"> 
                                    <div className="course_name input">
                                        <label>
                                            <p>Номер группы</p>
                                            <input type="text" onChange={e => setNumber(e.target.value)}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Специальность</p>
                                            <input type="text" onChange={e => setSpecialization(e.target.value)}/>
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

export default AddGroupPage;