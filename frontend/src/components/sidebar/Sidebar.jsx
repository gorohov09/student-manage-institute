import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'

import "./sidebar.scss"

const Sidebar = ({isTeacher}) => {
    return (
        <div className="sidebar">
            <div className="top">
                {isTeacher === undefined ? <Link to="/"><span className="logo">Учет студентов</span></Link> : <span>Учет студентов</span>}
            </div>
            <hr></hr>
            <div className="center">
                <ul>
                    <p className="title">ОСНОВНАЯ ИНФОМРАЦИЯ</p>
                    <li>
                        <AccountCircleIcon className='icon' />
                        {isTeacher === undefined ? <Link to="/students"><span>Студенты</span></Link> : <span>Студенты</span>}
                    </li>
                    <li>
                        <MenuBookIcon className='icon' />
                        {isTeacher === undefined ? <Link to="/groups"><span>Группы</span></Link> : <span>Группы</span>}
                    </li>
                </ul>
            </div>
            <div className="bottom"></div>
        </div>
    )
}

export default Sidebar;