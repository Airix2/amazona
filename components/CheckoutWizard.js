import React from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'
import s from '../styles/theme/styles'

export default function CheckoutWizard({activeStep=0}) {
    return (
        <Stepper activeStep={activeStep} alternativeLabel sx={s.transparentbg}>
            {
                ['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(step => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    )
}