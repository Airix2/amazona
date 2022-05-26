import { Link, Grid, List, ListItem, Typography, Card, Button } from '@mui/material';
import { useRouter } from 'next/router'
import React, { useState, createContext, useContext } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const Layout = dynamic(
    () => import('../../components/Layout'),
    { ssr: false }
)
import NextLink from 'next/link'

import s from '../../styles/theme/styles'
import axios from 'axios';
import { StateContext } from '../../utils/cart/stateContext'
const db = require('../../models/index.js');
const Products = db.products;

export async function getServerSideProps(context) {
    const {params, req, res} = context
    const {slug} = params;

    const product = await Products.findOne({
        where: {slug}
    });
    //const stateServ = JSON.parse(context.req.cookies.state ?? "{}");

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            //stateServ
        }
    }
}

const AppContext = createContext(null)

function ProductScreen({themeObj, product, stateServ}) {
    let { state, dispatch } = useContext(StateContext)
    // if (state.initial && Object.keys(stateServ).length) {
    //     state = stateServ;
    // }
    const router = useRouter();
    const { slug } = router.query;

    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find(x=>x.id === product.id);
        const quantity = existItem ? existItem.quantity + 1 : 1
        const {data} = await axios.get(`/api/products/${product.id}`)
        if (data.countInStock < quantity) {
            window.alert('Product OOS');
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity} })
        router.push('/cart')
    }

    return (
        <Layout title={product.name} description={product.description} themeObj={themeObj}>
            <div style={s.section}>
                <NextLink href='/' passHref>
                    <Link><Typography>Back to Products</Typography></Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive" />
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem><Typography component="h1" variant="h1">{product.name}</Typography></ListItem>
                        <ListItem><Typography>Category: {product.category}</Typography></ListItem>
                        <ListItem><Typography>Brand: {product.brand}</Typography></ListItem>
                        <ListItem><Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography></ListItem>
                        <ListItem><Typography>Description: {product.description}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Price</Typography></Grid>
                                    <Grid item xs={6}><Typography>${product.price}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Status</Typography></Grid>
                                    <Grid item xs={6}><Typography>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
                                Add To Cart
                            </Button>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ProductScreen