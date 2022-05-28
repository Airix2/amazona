import React, { createContext, useEffect, useReducer } from "react";
import Cookies from 'js-cookie'

export const StateContext = createContext();

const emptyState = {
    cart: {
        cartItems:[],
        shippingAddress: {},
        paymentMethod: ''
    },
    user: null,
    initial: true
}

function reducer(state, action) {
    state.initial = false
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                item => item.id === newItem.id
            )
            const cartItems = existItem ? 
                state.cart.cartItems.map ((item) => 
                    item.name === existItem.name ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            return { ...state, cart: { ...state.cart, cartItems }}
        }
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(item => 
                item.id !== action.payload.id
            );
            return { ...state, cart: { ...state.cart, cartItems }}
        }
        case 'USER_LOGIN': {
            return { ...state, user: action.payload}
        }
        case 'USER_LOGOUT': {
            return { ...state, user: null, cart: {cartItems: []}}
        }
        case 'SAVE_SHIPPING_ADDRESS': {
            return { ...state, cart: {...state.cart, shippingAddress: action.payload }}
        }
        case 'SAVE_PAYMENT_METHOD': {
            return { ...state, cart: {...state.cart, paymentMethod: action.payload }}
        }
        default:
            return state;
    }
}

export const StateProvider = ({ children }) => {
    const initialState = Cookies.get('state') ?  JSON.parse(Cookies.get('state')) : emptyState
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        Cookies.set("state", JSON.stringify(state));
    }, [state]);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};