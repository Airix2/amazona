import { Button, Link, List, ListItem, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Layout = dynamic(
    () => import('../components/Layout'),
    { ssr: false }
)
import CheckoutWizard from '../components/CheckoutWizard'
import { StateContext } from '../utils/cart/stateContext'
import s from '../styles/theme/styles'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'

export default function Shipping({themeObj}) {
    const { state, dispatch } = useContext(StateContext)
    const router = useRouter()
    const {handleSubmit, control, formState: {errors}, setValue} = useForm();
    const {shippingAddress} = state.cart

    useEffect(() => {
        if (!state.user) {
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress?.fullName)
        setValue('address', shippingAddress?.address)
        setValue('city', shippingAddress?.city)
        setValue('postalCode', shippingAddress?.postalCode)
        setValue('country', shippingAddress?.country)
    }, [])
    

    const submitHandler = ({ fullName, address, city, postalCode, country}) => {
        dispatch({type: 'SAVE_SHIPPING_ADDRESS', payload: { fullName, address, city, postalCode, country}})
        router.push('/payment')  // redirects to the query
    }

    return (
        <Layout title="Shipping Address" themeObj={themeObj}>
            <CheckoutWizard activeStep={1} />
            <form onSubmit={handleSubmit(submitHandler)} style={s.form}>
                <Typography component="h1" variant="h1">
                    Shipping Address
                </Typography>
                <List>
                    <ListItem>
                        <Controller 
                            name="fullName"
                            control={ control }
                            defaultValue=""
                            rules={{required: true, minLength: 2 }}
                            render={({field}) => (
                                <TextField 
                                    variant="outlined" fullWidth id="fullName" label="Full Name" 
                                    inputProps={{type: 'text'}} error={Boolean(errors.fullName)}
                                    helperText={
                                        errors.fullName 
                                            ? (errors.fullName.type === 'minLength' 
                                                ? 'Full Name length has to be 2 characters or more' 
                                                : 'Full Name is required') 
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller 
                            name="address"
                            control={ control }
                            defaultValue=""
                            rules={{required: true, minLength: 2 }}
                            render={({field}) => (
                                <TextField 
                                    variant="outlined" fullWidth id="address" label="Address" 
                                    inputProps={{type: 'text'}} error={Boolean(errors.address)}
                                    helperText={
                                        errors.address 
                                            ? (errors.address.type === 'minLength' 
                                                ? 'Address length has to be 2 characters or more' 
                                                : 'Address is required') 
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller 
                            name="city"
                            control={ control }
                            defaultValue=""
                            rules={{required: true, minLength: 2 }}
                            render={({field}) => (
                                <TextField 
                                    variant="outlined" fullWidth id="city" label="City" 
                                    inputProps={{type: 'text'}} error={Boolean(errors.city)}
                                    helperText={
                                        errors.city 
                                            ? (errors.city.type === 'minLength' 
                                                ? 'City length has to be 2 characters or more' 
                                                : 'City is required') 
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller 
                            name="postalCode"
                            control={ control }
                            defaultValue=""
                            rules={{required: true, minLength: 2 }}
                            render={({field}) => (
                                <TextField 
                                    variant="outlined" fullWidth id="postalCode" label="Postal Code" 
                                    inputProps={{type: 'text'}} error={Boolean(errors.postalCode)}
                                    helperText={
                                        errors.postalCode 
                                            ? (errors.postalCode.type === 'minLength' 
                                                ? 'Postal Code length has to be 2 characters or more' 
                                                : 'Postal Code is required') 
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller 
                            name="country"
                            control={ control }
                            defaultValue=""
                            rules={{required: true, minLength: 2 }}
                            render={({field}) => (
                                <TextField 
                                    variant="outlined" fullWidth id="country" label="Country" 
                                    inputProps={{type: 'text'}} error={Boolean(errors.country)}
                                    helperText={
                                        errors.country 
                                            ? (errors.country.type === 'minLength' 
                                                ? 'Country length has to be 2 characters or more' 
                                                : 'Country is required') 
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Continue
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
