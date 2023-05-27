import {useHttp} from '../hooks/http.hook';

const useInstituteService = () => {

    const {request, error, clearError} = useHttp();
    const _apiBase = 'http://localhost:5555/';

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return JSON.parse(tokenString);
    }

    const getResource = async(url) => {
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


    return {error,
        clearError, 
        getToken, 
        getAllGroups,
        getGroupById,
        createGroup,
        createStudent,
        deleteStudent
    }
}

export default useInstituteService;