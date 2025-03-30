import React from 'react';
import ProfileFieldCard from "../../../components/ProfileFieldCard";
import {Divider} from "@mui/material";
import {useAppSelector} from "../../../state/store";

const UserDetails = () => {

    const {auth} = useAppSelector(store => store)

    return (
        <div className='flex justify-center py-10'>
            <div className='w-full lg:w-[70%]'>
                <div className='flex items-center pb-3 justify-between'>
                    <h1 className='text-2xl font-bold text-gray-600'>Personal Details</h1>

                </div>

                <div >
                    <ProfileFieldCard keys='mobile' value={auth?.user?.mobile || ''} />
                    <Divider />
                    <ProfileFieldCard keys='name' value={auth?.user?.fullName || ''} />
                    <Divider />
                    <ProfileFieldCard keys='email' value={auth?.user?.email || ''} />
                </div>
            </div>

        </div>
    );
};

export default UserDetails;
