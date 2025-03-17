import React from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Checkout = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen'>
                <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9'>
                    <div className='col-span-2 space-y-5'>
                        <div className='flex justify-between items-center'>
                            <h1 className='font-semibold'>
                                select address
                            </h1>
                            <Button onClick={handleOpen}>
                                add new address
                            </Button>
                        </div>

                        <div className='text-xs font-medium space-y-5'>
                            <p className='font-semibold'>
                                saved addresses
                            </p>
                            <div className='space-y-3'>
                                {
                                    [1, 1, 1, 1].map((item) => <AddressCard/>)
                                }
                            </div>
                        </div>

                        <div className='py-4 px-5 rounded-md border'>
                            <Button onClick={handleOpen}>
                                add new address
                            </Button>
                        </div>


                    </div>

                    <div>
                        <div className='border rounded-md '>
                            <PricingCard/>

                            <div className='p-5'>
                                <Button fullWidth variant='contained' sx={{py: "11px"}}>
                                    checkout
                                </Button>
                            </div>
                        </div>
                    </div>


                </div>


            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm/>
                </Box>
            </Modal>
        </>
    );
};

export default Checkout;
