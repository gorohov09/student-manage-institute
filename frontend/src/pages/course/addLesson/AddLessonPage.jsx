import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useCourseService from "../../../services/CourseService";
import {Spinner} from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import './addLessonPage.scss';

const AddLessonPage = ({setIsAuth}) => {

    const {moduleId} = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {saveLesson} = useCourseService();

    const saveLessonL = async () => {
        const title = document.querySelector('#title');
        const link = document.querySelector('#link')

        if (title.value == null || title.value === '' || link.value == null || link.value === ''){
            return;
        }
        const data = {
            name: title.value,
            linkVideo: link.value
        }

        const res = await saveLesson(data, moduleId)
            .then(setLoading(loading => true))
        
        if (res)
            navigate(-1)
    }

    console.log('Рендер компонента');
    return (
        <div className="lesson">
            <Sidebar />
            <div className="lessonContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="addLesson">
                    {
                        !loading ?
                        <>
                            <h2>Добавление урока</h2>
                            <Box
                                sx={{
                                width: 500,
                                maxWidth: '100%',
                                marginBottom: 4,
                                marginTop: 2
                            }}>
                                <span>Введите название урока</span>
                                <TextField fullWidth label="Название урока" id="title" />
                            </Box>
                    
                            <Box
                                sx={{
                                width: 500,
                                maxWidth: '100%',
                                marginBottom: 4,
                                marginTop: 2
                            }}>
                                <span>Введите ссылку на видеоролик YouTube</span>
                                <TextField fullWidth label="Ссылка на видео" id="link" />
                            </Box>

                            <Button onClick={saveLessonL} className="save">
                                <span>Сохранить</span>
                            </Button>
                        </>
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

export default AddLessonPage;