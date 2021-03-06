import { Button, Link, List, ListItem, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Layout = dynamic(
    () => import('../components/Layout'),
    { ssr: false }
)
import NextLink from 'next/link'
import { StateContext } from '../utils/cart/stateContext'
import s from '../styles/theme/styles'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

export default function Login({themeObj}) {
    const { state, dispatch } = useContext(StateContext)
    const router = useRouter()
    const {handleSubmit, control, formState: {errors}} = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    useEffect(() => {
        if (state.user) {
            router.push('/');
        }
    }, [])
    

    const submitHandler = async ({email, password}) => {
        closeSnackbar();
        try {
            const {data} = await axios.post('/api/users/login', {email, password});
            dispatch({type: 'USER_LOGIN', payload: data})
            router.push(router.query.redirect || '/')  // redirects to the query
        } catch (error) {
            enqueueSnackbar(error.response.data? error.response.data.message : error.message, {variant: 'error'})
        }
        
    }

    return (
        <Layout title="Login" themeObj={themeObj}>
            <form onSubmit={handleSubmit(submitHandler)} style={s.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <Controller 
                            name="email"
                            control={ control }
                            defaultValue=""
                            rules={ {required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/} }
                            render={({field}) => (
                                <TextField 
                                    variant="outlined" fullWidth id="email" label="Email" 
                                    inputProps={{type: 'email'}} error={Boolean(errors.email)}
                                    helperText={
                                        errors.email 
                                            ? (errors.email.type === 'pattern' 
                                                ? 'Email is not valid' 
                                                : 'Email is required') 
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller 
                            name="password"
                            control={ control }
                            defaultValue=""
                            rules={ {required: true, minLength: 3} }
                            render={({field}) => (
                                <TextField 
                                    variant="outlined" fullWidth id="password" label="Password" 
                                    inputProps={{type: 'password'}} error={Boolean(errors.password)}
                                    helperText={
                                        errors.password 
                                            ? (errors.password.type === 'minLength' 
                                                ? 'Password length has to be 3 characters or more' 
                                                : 'Password is required') 
                                            : ''
                                    }
                                    {...field}
                                ></TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account?<NextLink href={`/register?redirect=${router.query.redirect || '/'}`} passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
