import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCourseService from '../../services/CourseService';
import {Spinner} from 'react-bootstrap';
import StarRateIcon from '@mui/icons-material/StarRate';


import './studentRatingListByCourse.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6439ff",
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

const StudentRatingListByCourse = ({courseId}) => {

	const [data, setData] = useState(null);
  	const [loading, setLoading] = useState(true);

  	const {getRatingStudentsByCourse} = useCourseService();

	useEffect(() => {
		getRatingStudentsByCourse(courseId)
				.then(data => setData(data))
				.then(setLoading(false));
	}, []);

    // const data = {
    //     students:
    //     [
    //         {
    //             studentId: "1234",
    //             order: 1,
    //             lastName: "Горохов",
    //             firstName: "Андрей",
    //             countCompleteTask: 123
    //         },
    //         {
    //             studentId: "1235",
    //             order: 2,
    //             lastName: "Ардинцев",
    //             firstName: "Максим",
    //             countCompleteTask: 120
    //         },
    //     ]
    // };

    // const loading = false;

	const renderItems = (data) => {
		return data.students.map((student) => (
			<StyledTableRow key={student.studentId}>
				<StyledTableCell component="th" scope="row">
					<div className="order_rating">
						<StarRateIcon className={`star position_${student.order}`}/>
						<span>{student.order}</span>
					</div>
					
				</StyledTableCell>
				<StyledTableCell align="right">{student.lastName}</StyledTableCell>
				<StyledTableCell align="right">{student.firstName}</StyledTableCell>
				<StyledTableCell align="right">{student.countCompleteTask}</StyledTableCell>
			</StyledTableRow>
		))
	};

	let items;
	if (data !== null){
		items = renderItems(data);
	}


  	return (
		!loading ?
		<>
			<TableContainer component={Paper}>
      			<Table sx={{ minWidth: 700 }} aria-label="customized table">
        		<TableHead>
          		<TableRow>
            		<StyledTableCell>Место</StyledTableCell>
            		<StyledTableCell>Фамилия</StyledTableCell>
            		<StyledTableCell>Имя</StyledTableCell>
            		<StyledTableCell align="right">Кол-во решенных задач</StyledTableCell>
          		</TableRow>
        		</TableHead>
        		<TableBody>
					{
						items
					}
        		</TableBody>
      		</Table>
    		</TableContainer>
		</>
		:
		<>
			<Spinner style={{'color':'#6439ff'}}/>
		</>
    );
}

export default StudentRatingListByCourse;