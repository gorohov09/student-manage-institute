import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './groupSinglePage.scss';
import { useState, useEffect } from "react";
import useInstituteService from "../../services/InstituteService";
import { Spinner } from "react-bootstrap";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link, useParams} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicModal from "../../components/modal/Modal";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: "linear-gradient( #6439ff, #a890fd);",
      color: "white",
      fontSize: 20,
      fontFamily: 'Nunito',
      textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
      fontFamily: 'Nunito',
      textAlign: 'center'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const GroupSinglePage = ({setIsAuth}) => {

    const {groupId} = useParams();

    const [data, setData] = useState(null);
  	const [loading, setLoading] = useState(true);
    const [itsOk, setItsOk] = useState(false);
    const [deleteStudentId, setDeleteStudentId] = useState(null);

  	const {getGroupById, deleteStudent} = useInstituteService();

	useEffect(() => {
		getGroupById(groupId)
				.then(data => setData(data))
				.then(setLoading(false));
	}, [itsOk]);

    const onDeleteStudent = (studentId) => {
        setItsOk(true);
        setDeleteStudentId(studentId);
    }

    const handlerDelete = () => {
        const data = {
            groupId: groupId,
            studentId: deleteStudentId
        }

        deleteStudent(data)
            .then(setItsOk(false))
    }

    const renderItems = (data) => {
		return data.group.students.map((student) => (
			<StyledTableRow key={student._id}>
				<StyledTableCell component="th" scope="row">
					<Link className='link' to={`${student._id}`}>{student._id}</Link>
				</StyledTableCell>
				<StyledTableCell align="right">{student._lastName}</StyledTableCell>
				<StyledTableCell align="right">{student._firstName}</StyledTableCell>
				<StyledTableCell align="right">{student._patronymic}</StyledTableCell>
				<StyledTableCell align="right">{student._birthday.split('T')[0]}</StyledTableCell>
        		<StyledTableCell align="right">{<Link onClick={() => onDeleteStudent(student._id)}>Удалить</Link>}</StyledTableCell>
				<StyledTableCell align="right">{<Link to={`/studentUpdate/${student._id}/${groupId}`}>Изменить</Link>}</StyledTableCell>
			</StyledTableRow>
		))
	};

    let items;
	if (data !== null){
        console.log(data);
		let temp = data;
		items = renderItems(temp);
	}

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar setIsAuth={setIsAuth}/>
                <div className="groupSingleBlock">

                {data !== null ?
		            <>
			            <div className="groupInformText">
                            <h2>Номер группы: {data.group.number}</h2>
                            <h2>Специальность: {data.group.specialization}</h2>
                        </div>

                        <div className="operationInGroup">
                            <Stack direction="row" spacing={2}>
                                <Button>
                                    <Link to={`/addStudent/${groupId}`}><span className="addGroupLink">Добавить студента в группу</span></Link>
                                </Button>

                            </Stack>
                        </div>

                        <BasicModal isOpen={itsOk} 
                        header={'Удаление студента'} 
                        text={'Вы точно хотите удалить студента?'} 
                        handler={handlerDelete}/>

                        <div className="tableStudents">
                            <TableContainer component={Paper}>
      			                <Table sx={{ minWidth: 700 }} aria-label="customized table">
        		                <TableHead>
          		                    <TableRow>
                                        <StyledTableCell>Id студента</StyledTableCell>
            		                    <StyledTableCell>Фамилия</StyledTableCell>
            		                    <StyledTableCell>Имя</StyledTableCell>
            		                    <StyledTableCell>Отчетсво</StyledTableCell>
            		                    <StyledTableCell align="right">Дата рождения</StyledTableCell>
                                        <StyledTableCell align="right"></StyledTableCell>
										<StyledTableCell align="right"></StyledTableCell>
          		                    </TableRow>
        		                </TableHead>
        		                <TableBody>
					                {
						                items
					                }
        		                </TableBody>
      		                </Table>
    		                </TableContainer>
                        </div>
		            </>
		            :
		            <>
			            <Spinner style={{'color':'#6439ff'}}/>
		            </>}

                </div>
            </div>
        </div>
    )
}

export default GroupSinglePage;