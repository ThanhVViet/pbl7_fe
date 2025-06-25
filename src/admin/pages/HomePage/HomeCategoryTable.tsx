import React, {useEffect} from 'react';
import {Button} from "@mui/material";
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
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchHomeCategories, fetchHomeCategoryById, updateHomeCategory, createHomeCategory} from "../../../state/admin/AdminSlice";
import {useNavigate} from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import HomeCategoryForm from '../../pages/Category/HomeCategoryForm';
import { Box, CircularProgress } from '@mui/material';

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

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { categories } = useAppSelector(store => store.admin)
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number|null>(null);
    const [initData, setInitData] = React.useState<HomeCategory|null>(null);
    const [addMode, setAddMode] = React.useState(false);

    useEffect(() => {
        dispatch(fetchHomeCategories())
    }, [])

    const handleEdit = async (id: number) => {
        setAddMode(false);
        setSelectedId(id);
        setOpen(true);
        setInitData(null);
        const res = await dispatch(fetchHomeCategoryById({id, jwt: localStorage.getItem('jwt') || ''}));
        if (fetchHomeCategoryById.fulfilled.match(res)) {
            setInitData(res.payload);
        }
    };
    const handleClose = () => {
        setOpen(false);
        setInitData(null);
        setSelectedId(null);
    };

    const handleAdd = () => {
        setAddMode(true);
        setOpen(true);
        setInitData(null);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: initData?.name || '',
            image: initData?.image || '',
            categoryId: initData?.categoryId || ''
        },
        onSubmit: async (values) => {
            if (!selectedId) return;
            const payload = { ...initData, ...values };
            await dispatch(updateHomeCategory({ id: selectedId, data: payload, jwt: localStorage.getItem('jwt') || '' }));
            await dispatch(fetchHomeCategories());
            toast.success('Cập nhật danh mục thành công!');
            handleClose();
        }
    });

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold'>Danh mục sản phẩm </h1>
                <Button
                    variant="contained"
                    onClick={handleAdd}
                >
                   Thêm danh mục
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Hình ảnh</StyledTableCell>
                            <StyledTableCell align="right">Danh mục</StyledTableCell>
                            <StyledTableCell align="right">Cập nhật </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((category, index) => (
                            <StyledTableRow key={category.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <img src={category.image} alt='' className='w-20 rounded-md'/>
                                </StyledTableCell>
                                <StyledTableCell align="right">{category?.name}</StyledTableCell>

                                <StyledTableCell align="right">
                                    <IconButton onClick={() => handleEdit(Number(category.id))}>
                                        <Edit/>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal cập nhật danh mục */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>{addMode ? 'Thêm danh mục mới' : 'Cập nhật danh mục'}</DialogTitle>
                {addMode ? (
                  <HomeCategoryForm
                    initialValues={{ name: '', image: '', categoryId: '' }}
                    loading={false}
                    submitLabel="Thêm danh mục"
                    onCancel={handleClose}
                    onSubmit={async (values) => {
                      const categoryId = values.name
                        .toLowerCase()
                        .normalize('NFD').replace(/\u0300|\u0301|\u0303|\u0309|\u0323|\u02C6|\u0306|\u031B/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '');
                      const payload = { ...values, categoryId };
                      await dispatch(createHomeCategory({ ...payload, jwt: localStorage.getItem('jwt') || '' }));
                      toast.success('Thêm danh mục thành công');
                      handleClose();
                    }}
                  />
                ) :
                  (!initData ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <HomeCategoryForm
                      initialValues={{
                        name: String(initData.name || ''),
                        image: String(initData.image || ''),
                        categoryId: String(initData.categoryId || '')
                      }}
                      loading={false}
                      submitLabel="Cập nhật"
                      onCancel={handleClose}
                      onSubmit={async (values) => {
                        if (!selectedId) return;
                        const payload = { ...initData, ...values };
                        await dispatch(updateHomeCategory({ id: selectedId, data: payload, jwt: localStorage.getItem('jwt') || '' }));
                        await dispatch(fetchHomeCategories());
                        toast.success('Cập nhật danh mục thành công!');
                        handleClose();
                      }}
                    />
                  ))
                }
            </Dialog>
        </>

    );
};

export default HomeCategoryTable;

