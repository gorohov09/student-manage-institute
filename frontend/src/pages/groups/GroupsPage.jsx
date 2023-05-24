import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import GroupList from "../../components/groupList/GroupList";

import './groupsPage.scss';

const GroupsPage = ({setIsAuth}) => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="groupsTable">

                    <div className="operation">
                        <Stack direction="row" spacing={2}>
                            <Button>
                                <Link to="/addGroup"><span className="addGroupLink">Добавить группу</span></Link>
                            </Button>

                            <Button color="secondary">
                                <span>Отсортировать по курсу</span>
                            </Button>

                        </Stack>
                    </div>

                    <div className="table">
                        <GroupList />
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default GroupsPage;