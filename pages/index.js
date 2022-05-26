import { CardActionArea, Grid, Card, CardMedia, Typography, CardContent, CardActions, Button } from '@mui/material'
import NextLink from 'next/link'
import { useContext } from 'react';
import { StateContext } from '../utils/cart/stateContext';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios';
const Layout = dynamic(
    () => import('../components/Layout'),
    { ssr: false }
)

const db = require('../models/index.js');
const Products = db.products;

export async function getServerSideProps(context) {
  const products = await Products.findAll();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default function Home({themeObj, products, stateServ}) {
  let { state, dispatch } = useContext(StateContext)
  const router = useRouter()

  const addToCartHandler = async (product) => {
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
    <Layout themeObj={themeObj} state={state}>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia component="img" image={product.image} title={product.name} />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary" onClick={() => addToCartHandler(product)}>Add to card</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}
