import React, { useContext, useState } from 'react'
import {useRouter} from 'next/router'
import { StateContext } from '../utils/cart/stateContext'

export default function Shipping() {
    const router = useRouter();
    const { state, dispatch } = useContext(StateContext)
    if (!state.user) {
        router.push('/login?redirect=/shipping');
    }
    return (
        <div>Shipping</div>
    )
}