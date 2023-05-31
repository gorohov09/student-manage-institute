import React, { useEffect, useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import WidgetInfo from '../../components/widgetInfo/WidgetInfo';

import "./homePage.scss";
import { Spinner } from "react-bootstrap";
import useInstituteService from "../../services/InstituteService";

const HomePage = ({setIsAuth}) => {

    const [data, setData] = useState(null);
  	const [loading, setLoading] = useState(true);

    const {getStatistic} = useInstituteService();

    useEffect(() => {
		getStatistic()
				.then(data => setData(data))
				.then(setLoading(false));
	}, []);

    console.log(data);

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="widgets">
                    {data !== null ?
                    <>
                        <WidgetInfo type="students" count={data.statistic.count_students}/>
                        <WidgetInfo type="groups" count={data.statistic.count_groups}/>
                    </>
                    :
                    <>
                        <Spinner style={{'color':'#6439ff'}}/>
                    </>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage;