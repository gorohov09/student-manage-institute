import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CourseList from "../../components/courseList/CourseList";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import {useState} from 'react';

import './coursesPage.scss';
import { Troubleshoot } from "@mui/icons-material";

const CoursesPage = ({setIsAuth}) => {
    const [isSortedByDate, setIsSortedByDate] = useState(false);

    return (
        <>
        <Navbar setIsAuth={setIsAuth}/>
        <div className="course">
            
            <div className="left_side">
                <Sidebar />
            </div>
            <div className="right_side">
                <div className="courseContainer">
                    
                    <div className="courses">
                        <div className="operation">
                            <Stack direction="row" spacing={2}>
                                <Button>
                                    <Link to="/addCourse"><span className="add">Добавить курс</span></Link>
                                </Button>
                                <Button color="secondary" 
                                onClick={() => setIsSortedByDate(true) }
                                ><span>Отсортировать по дате создания</span></Button>
                                <Button color="secondary"><span>Отсортировать по рейтингу</span></Button>
                            </Stack>
                        </div>
                        <CourseList isSortedByDate={isSortedByDate}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CoursesPage;