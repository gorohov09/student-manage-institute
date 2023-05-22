import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

import "./header.scss"

const Header = ({setIsAuth}) => {

    const navigate = useNavigate();

    const handleAuth = () => {
        sessionStorage.clear();
        setIsAuth(false);
        navigate("/login");
    }

    return (
        <div className="header">
            <div className="wrapper">
                <div className="top">
                    <Link to="/student"><span className="logo">По Шагам</span></Link>
                </div>

                <div className="items">
                    <div className="item">
                        <AccountCircleIcon className='icon'/>
                        <span>Мой аккаунт</span>
                    </div>

                    <div onClick={handleAuth} className="item">
                        <LogoutIcon className='icon'/>
                        <span>Выйти</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;