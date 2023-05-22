import Button from '@mui/material/Button';
import { useState } from 'react';

import './taskDetails.scss';

const TaskDetails = ({task}) => {

    const [isVisibleRightAnswer, setIsVisible] = useState(false);

    const {name, order, type, description, question, rightAnswer} = task;
    const classAnswer = isVisibleRightAnswer ? '' : 'hide';

    return (
        <div className="detailsTask">
            <div className="name">
                <p>{name}</p>
            </div>
            <div className="info">
                <p>Номер задачи: <span className="inf">{order}</span></p>
                <p>Тип задачи: <span className="inf">{type}</span></p>
            </div>
            <div className="questionDescr">
                <div className="descr">
                    <p>Описание: <span className="inf">{description}</span></p>
                </div>
                <div className="question">
                    <p>Вопрос: <span className="inf">{question}</span></p>
                </div>
            </div>
            <div className="answer">
                <Button onClick={() => setIsVisible(!isVisibleRightAnswer)} variant="contained" color="success">
                    Посмотреть правильный ответ
                </Button>
                <p className={classAnswer}>{rightAnswer}</p>
            </div>
                    
        </div>
    )
}

export default TaskDetails;


