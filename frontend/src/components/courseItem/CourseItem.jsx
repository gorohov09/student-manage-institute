import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useCourseService from '../../services/CourseService';
import "./courseItem.scss";
import { Spinner } from 'react-bootstrap';
import Modal from '../modal/Modal';

const CourseItem = ({courseId, 
    name, 
    description, 
    countStudents, 
    countTasks, 
    isEnroll,
    setIsEnrollReq

    }) => {

    const [loading, setLoading] = useState(false);
    const [isReqSuccess, setIsReqSuccess] = useState(false);
    
    const navigate = useNavigate();

    const {enrollCourse}= useCourseService();

    const onHandleToCourse = () => {
        navigate(`/courseForStudent/${courseId}`)
    }

    const onHandleEnroll = async () => {
        
        setLoading(loading => true);
        const res = await enrollCourse(courseId);

        if (res.isSuccess){
            setIsReqSuccess(res.isSuccess);
            setLoading(loading => false);
            setIsEnrollReq(true);
        }
    }

    // useEffect(()=>{
    //     setIsReqSuccess(false);
    // }, []);
    
    const classLabel = isEnroll ? 'enrollLabel' : 'noEnrollLabel';
    const textLabel = isEnroll ? 'Вы записаны' : 'Вы не записаны';

    return (
        // !loading ? 
        <>
            <div className="course_item">
                <div className="title_course_block">
                    <div className="name">
                        <span className="title_course">{name}</span>
                    </div>
                    <div className="label">
                        <span className={classLabel}>{textLabel}</span>
                    </div>
                </div>
                <div className="title_description_block">
                    <span className="title_description">{
                    description.length > 125 ? `${description.slice(0, 125)}...` : description
                    }</span>
                </div>
                <div className="course_statistic">
                    <div className="left_statistic">
                        <span className="count_students_course">Кол-во учеников: {countStudents}</span>
                    </div>
                    <div className="right_statistic">
                        <span className="count_tasks_course">Кол-во заданий: {countTasks}</span>
                    </div>
                </div>
                {
                    isEnroll ?
                    <>
                        <Button onClick={onHandleToCourse} className="toCourse">
                            <span className="toCourse_student">Перейти к заданиям</span>
                        </Button>
                    </>
                    :
                    <>
                    {!loading ?
                        <Button onClick={onHandleEnroll} className="enroll" disabled={loading}>
                            <span className="enroll_course">Записаться</span>
                        </Button>
                        :
                        <Spinner className="enroll_spinner"/>
                    }
                    </>
                    
                }
                <Modal isOpen={isReqSuccess}
                    header={'Вы успешно записаны на курс!'}
                    text={'Желаем Вам пройти путь к освоению новых технологий без больших препятствий, а те, что встретятся на пути, пусть лишь укрепят Вас!'}/>
            </div>
        </>
        
    )
}

export default CourseItem;