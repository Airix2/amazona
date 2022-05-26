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

export default function Login({themeObj}) {
    const { state, dispatch } = useContext(StateContext)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() => {
        if (state.user) {
            router.push('/');
        }
    }, [])
    

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/users/login', {email, password});
            dispatch({type: 'USER_LOGIN', payload: data})
            router.push(router.query.redirect || '/')  // redirects to the query
        } catch (error) {
            alert(error.response.data? error.response.data.message : error.message)
        }
        
    }

    return (
        <Layout title="Login" themeObj={themeObj}>
            <form onSubmit={submitHandler} style={s.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <TextField onChange={e => setEmail(e.target.value)} variant="outlined" fullWidth id="email" label="Email" inputProps={{type: 'email'}}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField onChange={e => setPassword(e.target.value)} variant="outlined" fullWidth id="password" label="Password" inputProps={{type: 'password'}}></TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account?<NextLink href="/register" passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
