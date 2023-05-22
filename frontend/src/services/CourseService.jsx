import {useHttp} from '../hooks/http.hook';

const useCourseService = () => {

    const {request, error, clearError} = useHttp();
    const _apiBase = 'http://localhost:5259/api/';

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return JSON.parse(tokenString);
    }

    const loginUser = async(credentials) => {
        const url = `${_apiBase}auth/login`
        return await request(url, 'POST', JSON.stringify(credentials), {'Content-Type': 'application/json'});
    }

    const registerUser = async(credentials) => {
        const url = `${_apiBase}auth/register`
        return await request(url, 'POST', JSON.stringify(credentials), {'Content-Type': 'application/json'});
    }

    const getResource = async(url) => {
        return await request(url, 'GET', null, {'Authorization': 'Bearer ' + getToken()});
    }

    const saveCourse = async(data) => {
        const url = `${_apiBase}course/create`;
        return await request(url, 'POST', JSON.stringify(data), {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()})
    }

    const saveModule = async (data, courseId) => {
        const url = `${_apiBase}course/${courseId}/addModule`;
        return await request(url, 'POST', JSON.stringify(data), { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        })
    }

    const saveLesson = async (data, moduleId) => {
        const url = `${_apiBase}course/module/${moduleId}/addLesson`;
        return await request(url, 'POST', JSON.stringify(data), { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        })
    }

    const saveTask = async (data, lessonId) => {
        const url = `${_apiBase}course/lesson/${lessonId}/addTask`;
        return await request(url, 'POST', JSON.stringify(data), { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        })
    }

    const enrollCourse = async (courseId) => {
        const url = `${_apiBase}course/enroll/${courseId}`;
        return await request(url, 'POST', null, { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        })
    }

    const makeAttempt = async (data, taskId) => {
        const url = `${_apiBase}course/task/${taskId}/makeAttempt`;
        return await request(url, 'POST', JSON.stringify(data), { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        })
    }

    const getCourseById = async (id) => {
        const res = await getResource(_apiBase + `course/${id}`);
        console.log(res);
        return res;
    }

    const getLessonById = async (id) => {
        const res = await getResource(_apiBase + `lesson/${id}`);
        return res;
    }

    const getTeacherCourses = async () => {
        const res = await getResource(_apiBase + `course/teacherCourses`);
        return res;
    }

    const getFirstLessonByCourse = async (courseId) => {
        const res = await getResource(_apiBase + `lesson/firstLesson/${courseId}`);
        return res;
    }

    const getPopularCourses = async () => {
        console.log(getToken());
        const res = await getResource(_apiBase + `course/popularCourses/`);

        const result = res.popularCourses.sort((a, b) => {
            return b.countStudents - a.countStudents
        });
        
        return result;
    }

    const getTasksByLesson = async (lessonId) => {
        const res = await getResource(_apiBase + `student/${lessonId}/tasks`);
        return res;
    }

    const getFirstTaskByLesson = async (lessonId) => {
        const res = await getResource(_apiBase + `task/firstLessonTsk/${lessonId}`);
        return res;
    }

    const getTaskById = async (taskId) => {
        const res = await getResource(_apiBase + `task/${taskId}`);
        return res;
    }

    const getRatingStudentsByCourse = async (courseId) => {
        const res = await getResource(_apiBase + `course/ratingStudents/${courseId}`);
        return res;
    }

    return {error,
        clearError, 
        getToken, 
        loginUser, 
        registerUser,
        getResource,
        saveCourse,
        saveLesson,
        saveModule,
        saveTask,
        enrollCourse,
        makeAttempt,
        getCourseById,
        getLessonById,
        getTeacherCourses,
        getFirstLessonByCourse,
        getPopularCourses,
        getTasksByLesson,
        getFirstTaskByLesson,
        getTaskById,
        getRatingStudentsByCourse
    }
}

export default useCourseService;