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

import './addModulePage.scss';

const AddModulePage = ({setIsAuth}) => {

    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {saveModule} = useCourseService();

    const saveModuleL = async () => {
        const title = document.querySelector('#title');

        if (title.value == null || title.value === ''){
            return;
        }
        const data = {
            name: title.value,
        }

        const res = await saveModule(data, courseId)
            .then(setLoading(loading => true))
        
        if (res)
            navigate(`/courses/${courseId}`)
    }

    return (
        <div className="module">
            <Sidebar />
            <div className="moduleContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="addModule">
                    {
                        !loading ?
                        <>
                            <h2>Добавление модуля</h2>
                            <Box
                                sx={{
                                width: 500,
                                maxWidth: '100%',
                                marginBottom: 4,
                                marginTop: 2
                            }}>
                                <span>Введите название модуля</span>
                                <TextField fullWidth label="Название курса" id="title" />
                            </Box>

                            <Button onClick={saveModuleL} className="save">
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

export default AddModulePage;