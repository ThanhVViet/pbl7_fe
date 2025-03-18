import React, {useState} from 'react';
import {Button, Step, StepLabel, Stepper} from "@mui/material";
import FormStep1 from "./FormStep1";
import {useFormik} from "formik";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";

const steps = [
    "tax details & mobile",
    "pickup address",
    "bank details",
    "supplier details"
]
const SellerAccountForm = () => {

    const [activeStep, setActiveStep] = useState(0)

    const formik = useFormik({
        initialValues: {
            mobile: '',
            otp: '',
            gstin: '',
            pickupAddress: {
                name: '',
                mobile: '',
                pincode: '',
                address: '',
                locality: '',
                city: '',
                state: ''
            },
            bankDetails: {
                accountNumber: '',
                ifscCode: '',
                accountHolderName: ''
            },
            sellerName: '',
            email: '',
            businessDetails: {
                businessName: '',
                businessEmail: '',
                businessMobile: '',
                logo: '',
                banner: '',
                businessAddress: ''

            },
            password: ''
        },
        onSubmit: (values) => {
            console.log('values', values);
        }
    })

    const handleStep = (value: number) => {

        (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) && setActiveStep(activeStep + value);

        activeStep === steps.length - 1 && handleCreateAccount();

        console.log('active step', activeStep);
    }

    const handleCreateAccount = () => {
        console.log('create account');
    }
    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {
                    steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>

            <section className='mt-20 space-y-10'>

                <div>
                    {
                        activeStep === 0 ? <FormStep1 formik={formik}/> :
                            activeStep === 1 ? <FormStep2 formik={formik}/> :
                                activeStep === 2 ? <FormStep3 formik={formik}/> :
                                    <FormStep4 formik={formik}/>
                    }
                </div>

                <div className='flex items-center justify-between'>
                    <Button onClick={() => handleStep(-1)} variant='contained' disabled={activeStep === 0}>
                        Back
                    </Button>

                    <Button onClick={() => handleStep(1)} variant='contained'>

                        {
                            activeStep === steps.length - 1 ? "Create Accout" : "Continue"
                        }
                    </Button>
                </div>

            </section>


        </div>
    );
};


export default SellerAccountForm;
