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


import './groupList.scss';

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

export default function GroupList({isSortedByDate}) {

	//const [data, setData] = useState(null);
  	const [loading, setLoading] = useState(true);

  	// const {getTeacherCourses} = useCourseService();

	// useEffect(() => {
	// 	getTeacherCourses()
	// 			.then(data => setData(data))
	// 			.then(setLoading(false));
	// }, []);

    const data = {
        groups: [
            {
                id: 123,
                number: '4311',
                specialization: 'Программная инженерия',
                countStudents: 11,
                creation: '12-12-2020'
            },
            {
                id: 120,
                number: '4310',
                specialization: 'Программная инженерия',
                countStudents: 3,
                creation: '15-12-2020'
            }
        ]
    }

    console.log(data);

	const renderItems = (data) => {
		return data.groups.map((group) => (
			<StyledTableRow key={group.id}>
				<StyledTableCell component="th" scope="row">
					<Link className='link'>{group.id}</Link>
				</StyledTableCell>
				<StyledTableCell align="right">{group.number}</StyledTableCell>
				<StyledTableCell align="right">{group.specialization}</StyledTableCell>
				<StyledTableCell align="right">{group.countStudents}</StyledTableCell>
				<StyledTableCell align="right">{group.creation}</StyledTableCell>
			</StyledTableRow>
		))
	};

	let items;
	if (data !== null){
		let temp = data;
		items = renderItems(temp);
	}


  	return (
		<div className='group_list__container'>
		{loading ?
		<>
			<TableContainer component={Paper}>
      			<Table sx={{ minWidth: 700 }} aria-label="customized table">
        		<TableHead>
          		<TableRow>
                    <StyledTableCell>Id Группы</StyledTableCell>
            		<StyledTableCell>Номер Группы</StyledTableCell>
            		<StyledTableCell>Специальность</StyledTableCell>
            		<StyledTableCell>Кол-во студентов</StyledTableCell>
            		<StyledTableCell align="right">Дата создания</StyledTableCell>
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
		</>}

		</div>
  );
}