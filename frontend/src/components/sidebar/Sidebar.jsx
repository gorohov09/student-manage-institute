import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'

import "./sidebar.scss"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="center">
                <ul>
                    <p className="title">Меню</p>
                    <li>
                        <AccountCircleIcon className='icon' />
                        <Link to="/"><span>Моя страница</span></Link>
                    </li>
                    <li>
                        <MenuBookIcon className='icon' />
                        <Link to="/courses"><span>Мои курсы</span></Link>
                    </li>
                </ul>
            </div>
            <div className="bottom"></div>
        </div>
    )
}

export default Sidebar;