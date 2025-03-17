import React from 'react';
import {Avatar, Box, IconButton, Rating} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {Delete} from "@mui/icons-material";
import {red} from "@mui/material/colors";


const ReviewCard = () => {
    return (
        <div className='flex justify-between'>
            <Grid container spacing={9}>
                <Grid size={{xs: 1}}>
                    <Box>
                        <Avatar className='text-white' sx={{width: 56, height: 56, bgcolor: "#9155FD"}}>
                            V
                        </Avatar>
                    </Box>
                </Grid>

                <Grid size={{xs: 9}}>
                    <div className='space-y-2'>
                        <div>
                            <p className='font-semibold text-lg'>thanh viet</p>
                            <p className='opacity-70'>2025</p>
                        </div>
                    </div>

                    <Rating readOnly value={4.5} precision={.5}/>
                    <p>value for money prodyct</p>
                    <div>
                        <img className='w-24 h-24 object-cover'
                             src='https://m.media-amazon.com/images/I/815Tm5YmzJL._AC_UF480,600_SR480,600_.jpg' alt=''/>
                    </div>
                </Grid>


            </Grid>
            <div>
                <IconButton>
                    <Delete sx={{color: red[700]}}/>
                </IconButton>
            </div>
        </div>
    );
};

export default ReviewCard;
