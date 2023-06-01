import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import GroupList from "../../components/groupList/GroupList";

import './noTeacher.scss';

const NoTeacher = ({setIsAuth}) => {
    return (
        <div className="home">
            <Sidebar isTeacher={'no'}/>
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="groupsTable">

                    <h2>Группы института</h2>

                    <div className="table">
                        <GroupList isTeacher={false}/>
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default NoTeacher;