import './taskItem.scss';

const TaskItem = ({id, isSolve, isFirstAttempt, order, setTaskId, isSelect}) => {

    let classTask = isFirstAttempt ? 'taskItem firt_attempt' : (isSolve ? 'taskItem solve_task' : 'taskItem not_solve_task');
    if (isSelect)
        classTask += " select_task";

    return (
        <div onClick={() => setTaskId(id)} className={classTask}>
            <div className="text">
                <span>{order}</span>
            </div>
        </div>
    )
}

export default TaskItem;