import "./cardCourse.scss";

const CardCourse = ({title, countStudents, rating, img}) => {
    return (
        <div className="course">
            <span className="title">Python-Start 1-ый год</span>
            <img src="https://sun6-22.userapi.com/s/v1/ig2/ci5k2FsmzdX20RyXKlNqX2e0g0GdR8AQkuNB3Os9-UjSwcfnZsqB9JPbGlOYE1m7TMdvVgv_YIS3tR5zOcAwt-wd.jpg?size=841x841&quality=96&crop=29,29,841,841&ava=1" />
            <div className="left">
                <span className="countStudents">Кол-во учеников: 13</span>
            </div>
            <div className="right">
                <span className="rating">Рейтинг: 5</span>
            </div>
            <span className="link">Подробнее</span>
        </div>
    )
}

export default CardCourse;