import React, { useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { StateContext } from '../utils/cart/stateContext';
import CheckoutWizard from '../components/CheckoutWizard';
import { Button, Link, List, ListItem, TextField, Typography, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material'
import s from '../styles/theme/styles'
import dynamic from 'next/dynamic'
const Layout = dynamic(
    () => import('../components/Layout'),
    { ssr: false }
)
import { useSnackbar } from 'notistack'

export default function Payment({themeObj}) {
    const router = useRouter();
    const { state, dispatch } = useContext(StateContext)
    const {cart: {shippingAddress}} = state
    const [paymentMethod, setPaymentMethod] = useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (!shippingAddress.address) {
            router.push('/shipping')
        } else {
            setPaymentMethod(state.cart.paymentMethod || '')
        }
    }, [])

    const submitHandler = (e) => {
        closeSnackbar();
        e.preventDefault();
        if (!paymentMethod) {
            enqueueSnackbar("Payment method is required", {variant: 'error'})
        } else {
            dispatch({type:'SAVE_PAYMENT_METHOD', payload: paymentMethod})
            router.push('/placeorder')
        }
    }

    return (
        <Layout title="Payment Method" themeObj={themeObj}>
            <CheckoutWizard activeStep={2} />
            <form onSubmit={submitHandler} style={s.form}>
                <Typography component="h1" variant="h1">Payment Method</Typography>
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="Payment Method" name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <FormControlLabel label="PayPal" value="PayPal" control={<Radio />}></FormControlLabel>
                                <FormControlLabel label="Stripe" value="Stripe" control={<Radio />}></FormControlLabel>
                                <FormControlLabel label="Cash" value="Cash" control={<Radio />}></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="submit" variant="contained" color="primary">Continue</Button>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="submit" variant="contained" onClick={() => router.push('shipping')}>Back</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}