import React, {useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {Edit} from "@mui/icons-material";

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
const HomeCategoryTable = () => {

    return (
        <>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="right">Image</StyledTableCell>
                            <StyledTableCell align="right">Category</StyledTableCell>
                            <StyledTableCell align="right">Update </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>{row.calories}</StyledTableCell>
                                <StyledTableCell>{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>

                                <StyledTableCell align="right">
                                    <Button>
                                        <Edit/>
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
};

export default HomeCategoryTable;

