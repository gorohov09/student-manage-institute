import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import {useParams, Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import useCourseService from "../../../services/CourseService";
import {Spinner} from "react-bootstrap";
import { Fragment } from "react";
import TaskDetails from "../../../components/taskDetails/TaskDetails";

import './lessonSinglePage.scss';

const LessonSinglePage = ({setIsAuth}) => {

    const {lessonId} = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const {getLessonById} = useCourseService();

    useEffect(() => {
        getLessonById(lessonId)
            .then(data => setData(data))
            .then(setLoading(false));
    }, []);

    const renderTasks = (data) => {
        return data.tasks.map(task => {
            return (
                <TaskDetails task={task}/>
            )
        });
    }
    
    let idLesson, name, embedHtmlVideo, tasks;
    if (data != null){
        idLesson = data.idLesson;
        name = data.name;
        embedHtmlVideo = data.embedHtmlVideo;
        tasks = renderTasks(data);
    }
    
    return (
        <div className="lesson">
            <Sidebar/>
            <div className="lessonContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="singleLesson">
                    {
                        !loading ?
                        <>
                            <h2>{name}</h2>
                            <h3>Теоретическое видео:</h3>
                            <div className="video" dangerouslySetInnerHTML={{ __html: embedHtmlVideo }} />
                            <h3>Задачи на урок:</h3>
                            <Button>
                                    <Link to={`/addTask/${lessonId}`}><span className="addTask">Добавить задачу</span></Link>
                            </Button>
                            <div className="tasks">
                                {tasks}
                            </div>
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

export default LessonSinglePage