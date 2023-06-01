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
import { Spinner } from 'react-bootstrap';


import './groupList.scss';
import useInstituteService from '../../services/InstituteService';
import BasicModal from '../modal/Modal';

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

export default function GroupList({isSortedByDate, isTeacher}) {

	const [data, setData] = useState(null);
  	const [loading, setLoading] = useState(true);
	const [itsOk, setItsOk] = useState(false);
	const [deleteGroupId, setDeleteGroupId] = useState(null);

  	const {getAllGroups, deleteGroup} = useInstituteService();

	useEffect(() => {
		getAllGroups()
				.then(data => setData(data))
				.then(setLoading(false));
	}, [itsOk]);

	const onDeleteGroup = (groupId) => {
        setItsOk(true);
        setDeleteGroupId(groupId);
    }

    const handlerDelete = () => {
        const data = {
            groupId: deleteGroupId,
        }

        deleteGroup(data)
            .then(setItsOk(false))
    }

    console.log(data);

	const renderItems = (data) => {
		return data.groups.map((group) => (
			<StyledTableRow key={group.id}>
				<StyledTableCell component="th" scope="row">
					{
						isTeacher === true ? <Link className='link' to={`/groupSingle/${group.id}`}>{group.id}</Link>
						: null
					}
					
				</StyledTableCell>
				<StyledTableCell align="right">{group.number}</StyledTableCell>
				<StyledTableCell align="right">{group.specialization}</StyledTableCell>
				<StyledTableCell align="right">{group.countStudents}</StyledTableCell>
				<StyledTableCell align="right">{group.creation.split('T')[0]}</StyledTableCell>
				<StyledTableCell align="right">{isTeacher === true ? <Link onClick={() => onDeleteGroup(group.id)}>Удалить</Link> : null}</StyledTableCell>
				<StyledTableCell align="right">{isTeacher === true ? <Link to={`/groupUpdate/${group.id}`}>Изменить</Link> : null}</StyledTableCell>

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
		{!loading ?
		<>
			<BasicModal isOpen={itsOk} 
                        header={'Удаление группы'} 
                        text={'Вы точно хотите удалить группу?'} 
                        handler={handlerDelete}/>
			<TableContainer component={Paper}>
      			<Table sx={{ minWidth: 700 }} aria-label="customized table">
        		<TableHead>
          		<TableRow>
                    <StyledTableCell>Id Группы</StyledTableCell>
            		<StyledTableCell>Номер Группы</StyledTableCell>
            		<StyledTableCell>Специальность</StyledTableCell>
            		<StyledTableCell>Кол-во студентов</StyledTableCell>
            		<StyledTableCell align="right">Дата создания</StyledTableCell>
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
		</>
		:
		<>
			<Spinner style={{'color':'#6439ff'}}/>
		</>}

		</div>
  );
}