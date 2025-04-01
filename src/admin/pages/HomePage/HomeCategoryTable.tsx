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
import {HomeCategory} from "../../../types/HomeCategoryType";

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



const accountStatuses = [
    {status: "PENDING_VERIFICATION", title: '', description: 'Account is '},
    {status: "ACTIVE", title: 'Active', description: 'Account is active '},
    {status: "SUSPENDED", title: 'Suspended', description: 'Account is temporarily suspended '},
    {status: "DEACTIVATED", title: 'Deactivated', description: 'Account is deactivated '},
    {status: "BANNED", title: 'Banned', description: 'Account is permanently banned '},
    {status: "CLOSED", title: 'Closed', description: 'Account is  permanently closed'},
]
const HomeCategoryTable = ({data}:{data:HomeCategory[]}) => {

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
                        {data.map((category, index) => (
                            <StyledTableRow key={category.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{category.id}</StyledTableCell>
                                <StyledTableCell>
                                    <img src={category.image} alt='' className='w-20 rounded-md'/>
                                </StyledTableCell>
                                <StyledTableCell align="right">{category.categoryId}</StyledTableCell>

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

