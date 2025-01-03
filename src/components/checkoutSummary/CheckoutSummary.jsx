import React from "react";
import styles from "./CheckoutSummary.module.scss";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3>CheckoutSummary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No items in your cart</p>
            <Link to='/#products'>
              <button className='--btn'>&larr; Back to Shop</button>
            </Link>
          </>
        ) : (
          <>
            <p>
              Cart Item(s): <b>{cartTotalQuantity}</b>
            </p>
            <div className={styles.text}>
              <h4>Subtotal:</h4>
              <h3>${cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card cardClass={styles.card} key={id}>
                  <h4>{`Product: ${name}`}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit Price: ${price}</p>
                  <p>Set Price: ${price * cartQuantity}</p>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
