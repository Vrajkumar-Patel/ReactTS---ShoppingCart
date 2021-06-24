import React from "react";
import { CartItemType } from "../App";
import { Card, Avatar } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteTwoTone } from '@ant-design/icons'

const { Meta } = Card;

type Props = {
  item: CartItemType;
  handleRemoveFromCart: (id: number) => CartItemType[];
};

const CartItems: React.FC<Props> = ({ item, handleRemoveFromCart }) => {
  return (
    <Card
      actions={[<PlusOutlined/> , <MinusOutlined/>, <DeleteTwoTone onClick={() => handleRemoveFromCart(item.id)}>ADD TO CART</DeleteTwoTone>]}
    >
      <Meta
        avatar={<Avatar src={item.image} />}
        title={item.title}
        description={item.description}
      />
      <br />
      <div>Item Category: {item.category}</div>
      <div>Item Quantity: {item.quantity}</div>
      <div>Price: ${item.price}</div>
    </Card>
  );
};

export default CartItems;
