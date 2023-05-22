import { useState, useEffect, useRef } from 'react';
import useCourseService from '../../services/CourseService';
import { TextField, Button } from '@mui/material';
import {Spinner} from 'react-bootstrap';


import './game.scss';

const Game = ({taskInform, render, setRender}) => {
    const [answer, setAnswer] = useState(taskInform?.lastAnswerAttempt);
    const [attempt, setAttempt] = useState(null);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setAttempt(null);
        setAnswer(taskInform?.lastAnswerAttempt == null ? '' : taskInform?.lastAnswerAttempt);
    }, [taskInform])

    const {makeAttempt} = useCourseService();

    const onMakeAttempt = async () => {
        const data = {
            answer: answer,
        }
        const res = await makeAttempt(data, taskInform.taskId)
        
        if (res.isRight)
            setAttempt(true)
        else
            setAttempt(false);

        setRender(!render);
    }

    let task;
    if (taskInform.type === 'Свободный ответ'){
        task = (
            <>
                <div className="inform">
                    {
                        taskInform.lastAttempt != null ?
                        <>
                            <p className='attempt'>Последняя попытка: {taskInform.lastAttempt.substring(0, taskInform.lastAttempt.indexOf('T')) + ' ' + taskInform.lastAttempt.substring(taskInform.lastAttempt.indexOf('T') + 1, taskInform.lastAttempt.length - 8)}</p>
                            <p className='isSolveAttempt'>В последний раз задача решена <span className={taskInform.lastResultAttempt ? 'correct' : 'error'}>{taskInform.lastResultAttempt ? 'правильно' : 'неправильно'}</span></p>
                        </>
                        :
                        <>
                            <p className='noattempt'>Данную задачу вы не решали</p>
                        </>
                    }
                    
                </div>
                <h1>{taskInform.name}</h1>
                <h2>{taskInform.question}</h2>
                <div className="text_field_block">
                    <TextField
                        id="outlined-controlled"
                        label="Введи ответ"
                        value={answer}
                        onChange={(event) => {
                            setAnswer(event.target.value);
                        }}
                    />
                </div>
                <div className="button_block">
                    <Button onClick={onMakeAttempt} className="toAnswer">
                        <span className="toAnswer_student">Ответить</span>
                    </Button>
                </div>
            </>
        )
    }
    else if (taskInform.type === 'Один ответ') {
        task = (
            <>
                <p>Задача с одним ответом</p>
            </>
        )
    }

    return (
        <div className='game'>
            {task}
        </div>
    );
}

export default Game;