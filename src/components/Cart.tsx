import React from 'react';
import { CartItemType } from '../App';
import { Card, Avatar } from 'antd';
import CartItems from "./CartItems"


type Props = {
    cartItem: CartItemType[];
    handleRemoveFromCart: (id: number) => CartItemType[] 
}

const Cart:React.FC<Props> = ({cartItem, handleRemoveFromCart}) => {
    return (
        <div>
            <Card title="Cart Products">
              {cartItem?.map((item) => (
                <CartItems item={item} handleRemoveFromCart={handleRemoveFromCart} />
              ))}
            </Card>
        </div>
    )
}

export default Cart
