import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

import "./navbar.scss"

const Navbar = ({setIsAuth}) => {

    const navigate = useNavigate();

    const handleAuth = () => {
        sessionStorage.clear();
        setIsAuth(false);
        navigate("/login");
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Поиск..."/>
                    <ManageSearchIcon />
                </div>

                <div className="items">
                    <div onClick={handleAuth} className="item">
                        <LogoutIcon className='icon'/>
                        <span>Выйти</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;