import React from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import WidgetInfo from '../../components/widgetInfo/WidgetInfo';

import "./homePage.scss";

const HomePage = ({setIsAuth}) => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="widgets">
                    <WidgetInfo type="students"/>
                    <WidgetInfo type="courses"/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;