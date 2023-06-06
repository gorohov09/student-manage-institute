import {useHttp} from '../hooks/http.hook';

const useInstituteService = () => {

    const {request, setError, clearError} = useHttp();
    const _apiBase = 'http://localhost:8000/api/';

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return JSON.parse(tokenString);
    }

    const getResource = async(url) => {
        console.log('URL:', url);
        return await request(url, 'GET', null, {'Authorization': 'Bearer ' + getToken()});
    }

    const getAllGroups = async () => {
        const res = await getResource(_apiBase + `groups/getAllGroups`);
        return res;
    }

    const getGroupById = async (idGroup) => {
        const res = await getResource(_apiBase + `groups/getStudentsByGroup?idGroup=${idGroup}`);
        return res;
    }

    const getStatistic = async () => {
        const res = await getResource(_apiBase + `groups/getStatistic`);
        return res;
    }

    const createGroup = async(groupInform) => {
        const url = `${_apiBase}groups/createGroup`
        return await request(url, 'POST', JSON.stringify(groupInform), {'Content-Type': 'application/json'});
    }

    const createStudent = async(studentInform) => {
        const url = `${_apiBase}groups/createStudent`
        return await request(url, 'POST', JSON.stringify(studentInform), {'Content-Type': 'application/json'});
    }

    const deleteStudent = async(deleteInform) => {
        const url = `${_apiBase}groups/deleteStudent`
        return await request(url, 'POST', JSON.stringify(deleteInform), {'Content-Type': 'application/json'});
    }

    const deleteGroup = async(deleteInform) => {
        const url = `${_apiBase}groups/deleteGroup`
        return await request(url, 'POST', JSON.stringify(deleteInform), {'Content-Type': 'application/json'});
    }

    const updateGroup = async(idGroup, updateInform) => {
        const url = `${_apiBase}groups/updateGroup?idGroup=${idGroup}`
        console.log(updateInform);
        return await request(url, 'POST', JSON.stringify(updateInform), {'Content-Type': 'application/json'});
    }

    const updateStudent = async(idStudent, updateInform) => {
        const url = `${_apiBase}groups/updateStudent?idStudent=${idStudent}`
        return await request(url, 'POST', JSON.stringify(updateInform), {'Content-Type': 'application/json'});
    }

    const getGroupByIdWithoutStudent = async (idGroup) => {
        const res = await getResource(_apiBase + `groups/getGroupById?idGroup=${idGroup}`);
        return res;
    }

    const getStudentById = async (idStudent) => {
        const res = await getResource(_apiBase + `groups/getStudentById?idStudent=${idStudent}`);
        return res;
    }

    const loginUser = async (info) => {
        const url = `${_apiBase}users/login`
        return await request(url, 'POST', JSON.stringify(info), {'Content-Type': 'application/json'});
    }

    const registerUser = async (info) => {
        const url = `${_apiBase}users/register`
        return await request(url, 'POST', JSON.stringify(info), {'Content-Type': 'application/json'});
    }


    return {setError,
        clearError, 
        getToken, 
        getAllGroups,
        getGroupById,
        createGroup,
        createStudent,
        deleteStudent,
        deleteGroup,
        getStatistic,
        updateGroup,
        updateStudent,
        getGroupByIdWithoutStudent,
        getStudentById,
        loginUser,
        registerUser
    }
}

export default useInstituteService;