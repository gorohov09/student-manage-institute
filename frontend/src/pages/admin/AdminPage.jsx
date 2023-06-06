import Button from '@mui/material/Button';

import * as React from 'react';

import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import './adminPage.scss';

import { ThemeProvider  } from '@mui/material/styles';
import theme from '../../components/muiTheme';

import BasicModal, { InformModal } from '../../components/modal/Modal';
import useInstituteService from '../../services/InstituteService';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import SigninForm from '../../components/signinForm/SigninForm';

const AdminPage = ({setToken, setIsAuth}) => {
    return(
        <>
        <Navbar setIsAuth={setIsAuth}/>
                
                <h1>Добавьте преподавателя</h1>
                <div className="auth_form__container">
        
                    <div className="auth_form__form">
                        <SigninForm setToken={setToken} isTeacher={true}/>
                    </div>
                </div>
        </>        
    )
}

export default AdminPage;