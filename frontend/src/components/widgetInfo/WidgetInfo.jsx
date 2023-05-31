import "./widgetinfo.scss";

import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const WidgetInfo = ({type, count}) => {

    let data;
    switch (type) {
        case "students":
            data = {
                title: "Общее кол-во студентов",
                link: "Посмотреть всех",
                icon: <PeopleIcon className="icon"/>
            };
            break;
        case "groups":
            data = {
                title: "Общее кол-во групп",
                link: "Посмотреть все",
                icon: <MenuBookIcon className="icon"/>
            }
            break;

        default:
            break;  
    }

    const {title, link, icon} = data;

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{title}</span>
                <span className="counter">{count}</span>
                <span className="link">{link}</span>
            </div>
            {/* <div className="right">
                <div className="percentage">
                    <span className="title">От общего числа: 20%</span>
                </div>
                {icon}
            </div> */}
        </div>
    )
}

export default WidgetInfo;