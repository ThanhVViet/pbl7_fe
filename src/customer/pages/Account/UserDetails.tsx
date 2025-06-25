import React from 'react';
import {useAppSelector} from "../../../state/store";
import {Avatar, Divider, Paper, Typography} from "@mui/material";
import {Phone, Email, Person} from '@mui/icons-material';

const ProfileFieldCard = ({icon, label, value}: { icon: React.ReactNode, label: string, value: string }) => {
    return (
        <div className="flex items-center gap-4 py-4">
            <div className="text-gray-500">{icon}</div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-lg font-medium text-gray-800">{value}</p>
            </div>
        </div>
    );
};

const UserDetails = () => {
    const {user} = useAppSelector(store => store.auth);

    return (
        <div className='flex justify-center items-center py-10 px-4'>
            <Paper elevation={1} className='w-full max-w-2xl  p-6 '>
                <div className='flex flex-col items-center pb-6'>
                    <Avatar
                        alt={user?.username}
                        src="/avatar-placeholder.png"
                        sx={{width: 100, height: 100}}
                    />
                    <Typography variant="h5" className="mt-4 font-bold text-gray-700">
                        {user?.username || 'Your Name'}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                        Personal Profile
                    </Typography>
                </div>

                <Divider/>

                <div className="mt-6">
                    <ProfileFieldCard
                        icon={<Phone/>}
                        label="Mobile"
                        value={user?.mobile || 'Not provided'}
                    />
                    <Divider/>
                    <ProfileFieldCard
                        icon={<Email/>}
                        label="Email"
                        value={user?.email || 'Not provided'}
                    />
                    <Divider/>

                    <ProfileFieldCard
                        icon={<Person/>}
                        label="Username"
                        value={user?.username || 'Not provided'}
                    />

                </div>
            </Paper>
        </div>
    );
};

export default UserDetails;
