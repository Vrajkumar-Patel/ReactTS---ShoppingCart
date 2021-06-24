import React, {useState} from 'react';
import { CartItemType } from '../App';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void
}

// const gridStyle = {
//     width: '33.333%',
//     textAlign: 'center',
//   };


const Item: React.FC<Props> = ({item, handleAddToCart} ) => {
        
    return (
      <Card actions={[<h3 onClick={() => handleAddToCart(item)}>ADD TO CART</h3>]} >
            <Meta
            avatar={
              <Avatar src={item.image} />
            }
            title={item.title}
            description={item.description}
            />
            <br/>
            <div>Item Category: {item.category}</div>
            <div>Price: ${item.price}</div>
            </Card>
     
    )
}

export default Item

 