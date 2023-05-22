import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useCourseService from "../../../services/CourseService";
import {Spinner} from "react-bootstrap";


import './addTaskPage.scss';

const AddTaskPage = ({setIsAuth}) => {

    const {lessonId} = useParams();
    const [loading, setLoading] = useState(false);
    const [typeTask, setType] = useState('freeResponse')
    const [value, setValue] = useState('1');
    const navigate = useNavigate();

    const {saveTask} = useCourseService();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === "1")
            setType("freeResponse")
        else if (newValue === "2")
            setType("oneAnswer");
    };

    const saveTaskL = async () => {
        const name = document.querySelector('#name');
        const description = document.querySelector('#description');
        const question = document.querySelector('#question');
        const answerType1 = document.querySelector('#answerType1');
        const answerType2 = document.querySelector('#answerType2');
        const wrongAnswers = document.querySelector('#wrongAnswers');

        const data = {
            name: name.value,
            type: typeTask,
            description: description.value,
            question: question.value,
            answer: typeTask === "freeResponse" ? answerType1.value : answerType2.value,
            answers: null,
            wrongAnswers: typeTask === "oneAnswer" ? wrongAnswers?.value : null
        }

        console.log(data);
        console.log(lessonId);

        const res = await saveTask(data, lessonId)
            .then(setLoading(loading => true))
        
        if (res)
            navigate(`/lessons/${lessonId}`)
    }

    console.log(lessonId);

    return (
        <div className="task">
            <Sidebar />
            <div className="taskContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="addTask">
                    {
                        !loading ?
                        <>
                            <h2>Добавление задания</h2>
                            <Box
                                sx={{
                                width: 500,
                                maxWidth: '100%',
                                marginBottom: 4,
                                marginTop: 2
                            }}>
                                <span>Введите название задания</span>
                                <TextField fullWidth label="Название" id="name" />
                            </Box>

                            <Box
                                sx={{
                                width: 500,
                                maxWidth: '100%',
                                marginBottom: 4,
                                marginTop: 2
                            }}>
                                <span>Введите описание задания</span>
                                <TextField fullWidth label="Описание" id="description" />
                            </Box>

                            <Box
                                sx={{
                                width: 500,
                                maxWidth: '100%',
                                marginBottom: 4,
                                marginTop: 2
                            }}>
                                <span>Введите итоговый вопрос задания</span>
                                <TextField fullWidth label="Итоговый вопрос" id="question" />
                            </Box>

                            <div className="typeTask">
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab label="Свободный ответ" value="1" />
                                                <Tab label="Выбор одного ответа" value="2" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1">
                                            <Box
                                                sx={{
                                                width: 500,
                                                maxWidth: '100%',
                                                marginBottom: 4,
                                                marginTop: 2
                                                }}>
                                                <span>Введите ответ</span>
                                                <TextField fullWidth label="Ответ" id="answerType1" />
                                            </Box>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <Box
                                                sx={{
                                                width: 500,
                                                maxWidth: '100%',
                                                marginBottom: 4,
                                                marginTop: 2
                                                }}>
                                                <span>Введите ответ</span>
                                                <TextField fullWidth label="Ответ" id="answerType2" />
                                            </Box>
                                            <Box
                                                sx={{
                                                width: 500,
                                                maxWidth: '100%',
                                                marginBottom: 4,
                                                marginTop: 2
                                                }}>
                                                <span>Введите неправильные ответы через запятую</span>
                                                <TextField fullWidth label="Неправильные ответы" id="wrongAnswers" />
                                            </Box>
                                        </TabPanel>
                                    </TabContext>
                                </Box>
                            </div>
                            

                            <Button onClick={saveTaskL} className="save">
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

export default AddTaskPage;