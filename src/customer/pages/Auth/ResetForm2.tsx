import React, {useState} from 'react';
import {TextField} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetForm2 = ({formik}: any) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    return (
        <div className='space-y-5'>


            <div className=' relative'>
                <TextField
                    type={isPasswordVisible ? 'text' : 'password'}
                    fullWidth
                    name='newPassword'
                    label='Mật khẩu mới'
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched?.newPassword && Boolean(formik.errors?.newPassword)}
                    helperText={formik.touched?.newPassword && formik.errors?.newPassword}
                />

                <button
                    type='button'
                    className="w-[25px] cursor-pointer absolute right-[15px] top-[26px] transform -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    {isPasswordVisible ? <RemoveRedEyeIcon className='text-red-600'/> : <VisibilityOffIcon/>}
                </button>
            </div>

            <div className=' relative'>
                <TextField
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    fullWidth
                    name='confirmNewPassword'
                    label='Xác nhận mật khẩu mới'
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched?.confirmNewPassword && Boolean(formik.errors?.confirmNewPassword)}
                    helperText={formik.touched?.confirmNewPassword && formik.errors?.confirmNewPassword}
                />

                <button
                    type='button'
                    className="w-[25px] cursor-pointer absolute right-[15px] top-[26px] transform -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                    {isConfirmPasswordVisible ? <RemoveRedEyeIcon className='text-red-600'/> : <VisibilityOffIcon/>}
                </button>
            </div>

        </div>
    );
};

export default ResetForm2;
