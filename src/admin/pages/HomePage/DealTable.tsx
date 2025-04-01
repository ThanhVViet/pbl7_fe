import React, {useEffect, useState} from 'react';
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {Delete, Edit} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {getAllDeals} from "../../../state/admin/DealSlice";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const accountStatuses = [
    {status: "PENDING_VERIFICATION", title: '', description: 'Account is '},
    {status: "ACTIVE", title: 'Active', description: 'Account is active '},
    {status: "SUSPENDED", title: 'Suspended', description: 'Account is temporarily suspended '},
    {status: "DEACTIVATED", title: 'Deactivated', description: 'Account is deactivated '},
    {status: "BANNED", title: 'Banned', description: 'Account is permanently banned '},
    {status: "CLOSED", title: 'Closed', description: 'Account is  permanently closed'},
]
const DealTable = () => {

    const [accountStatus, setAccountStatus] = useState('ACTIVE')
    const dispatch = useAppDispatch()
    const {deal} = useAppSelector(store => store)

    const handleChange = (event: any) => {
        setAccountStatus(event.target.value)
    }

    useEffect(() => {
        dispatch(getAllDeals())
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell align="right">Category</StyledTableCell>
                            <StyledTableCell align="right">Discount</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                            <StyledTableCell align="right">Delete </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deal.deals.map((item, index) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <img alt='' className='w-20 rounded-md' src={item.category.image}/>
                                </StyledTableCell>
                                <StyledTableCell>{item.category.categoryId}</StyledTableCell>
                                <StyledTableCell align="right">{item.discount}</StyledTableCell>

                                <StyledTableCell align="right">
                                    <Button>
                                        <Edit/>
                                    </Button>
                                </StyledTableCell>

                                <StyledTableCell align="right">
                                    <IconButton>
                                        <Delete sx={{color: 'red'}}/>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
};

export default DealTable;

