import { AppBar, Container, Link, Switch, Toolbar, Typography, Badge, Button, Menu, MenuItem } from '@mui/material'
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import NextLink from 'next/link'
import s from '../styles/theme/styles'
import {useRouter} from 'next/router'
import { StateContext } from '../utils/cart/stateContext'

function Layout({title, children, description, themeObj}) {
    const router = useRouter();
    const { state, dispatch } = useContext(StateContext)
    const { user, cart } = state;
    const [anchorEl, setAnchorEl] = useState(null)
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const loginMenuCloseHandler = () => {
        setAnchorEl(null);
    }
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({type:'USER_LOGOUT'})
        router.push('/')
    }

    return (
        <div>
            <Head>
                <title>{title ? `${title} - Next Amazona`: 'Next Amazona'}</title>
                {description && <meta name="description" content={description} />}
            </Head>
            <AppBar position="static" sx={s.navbar} >
                <Toolbar>
                    <NextLink href="/" passHref><Link>
                        <Typography sx={s.brand}>amazona</Typography>
                    </Link></NextLink>
                    <div style={s.grow}></div>
                    <div>
                        <Switch checked={themeObj?.theme == 'dark'} onChange={themeObj.toggleTheme}></Switch>
                        <NextLink href="/cart" passHref>
                            <Link>{cart.cartItems.length > 0 ? (<Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>) : ('Cart')}</Link>
                        </NextLink>
                        { 
                            user ? 
                            <>
                                <Button sx={s.navbarBtn} aria-controls="simple-menu" aria-haspopup="true" onClick={loginClickHandler}>
                                    {user.name}
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={loginMenuCloseHandler}
                                >
                                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                                    <MenuItem onClick={loginMenuCloseHandler}>My Account</MenuItem>
                                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                                </Menu>
                            </>
                            :
                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Container sx={s.main}>
                {children}
            </Container>
            <footer style={s.footer}>
                <Typography>
                    All rights reserved. Next Amazona
                </Typography>
            </footer>
        </div>
    )
}

//export default dynamic(() => Promise.resolve(Layout), {ssr: false})
export default Layout