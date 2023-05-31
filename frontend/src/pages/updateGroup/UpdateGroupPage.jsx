import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import * as React from 'react';
import Button from '@mui/material/Button';
import {Spinner} from "react-bootstrap";

import { ThemeProvider  } from '@mui/material/styles';
import theme from '../../components/muiTheme.jsx';

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './updateGroupPage.scss';
import useInstituteService from "../../services/InstituteService";

const UpdateGroupPage = ({setIsAuth}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState();
    const [specialization, setSpecialization] = useState();
    const navigate = useNavigate();

    const {groupId} = useParams();
    const {updateGroup, getGroupByIdWithoutStudent} = useInstituteService();

    useEffect(() => {
		getGroupByIdWithoutStudent(groupId)
				.then(data => {
                    setData(data);
                    setLoading(false);
                    setNumber(data?.group.number);
                    setSpecialization(data?.group.specialization);
                })
				.then(() => {
                    
                });
	}, []);

    const onHandleSubmit = async(e) => {
        e.preventDefault();

        if (number == null || number === '' || specialization == null || specialization === ''){
            return;
        }

        const data = await updateGroup(groupId, {
			number: number,
		  	specialization: specialization
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
                            data !== null ?
                            <div className="addGroup__form">
                                <h2>Обновление группы</h2>
                                <form onSubmit={onHandleSubmit} className="course__form"> 
                                    <div className="course_name input">
                                        <label>
                                            <p>Номер группы</p>
                                            <input type="text" onChange={e => setNumber(e.target.value)} value={number}/>
                                        </label>
                                    </div>
                                    <div className="course_desc input">
                                        <label>
                                            <p>Специальность</p>
                                            <input type="text" onChange={e => setSpecialization(e.target.value)} value={specialization}/>
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

export default UpdateGroupPage;