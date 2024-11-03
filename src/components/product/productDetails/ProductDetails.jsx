import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cart = cartItems.find((item) => item.id === id);

  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productId === id);

  // const getProduct = async () => {
  //   const productRef = doc(db, "products", id);
  //   const productSnap = await getDoc(productRef);

  //   if (productSnap.exists()) {
  //     setProduct({ id, ...productSnap.data() });
  //   } else {
  //     toast.error("Product not found");
  //   }
  // };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_SUB_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_SUB_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Detials</h2>
        <div>
          <Link to='/#products'>&larr; Back to Products</Link>
        </div>
        {product === null ? (
          <img
            src={spinnerImg}
            alt='spinner'
            style={{ width: "50px" }}
            className='--center-all'
          />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU: </b>
                  {product.id}
                </p>
                <p>
                  <b>Brand: </b>
                  {product.brand}
                </p>

                {cart?.cartQuantity > 0 && (
                  <div className={styles.count}>
                    <button
                      className='--btn'
                      onClick={() => decreaseCart(product)}
                    >
                      -
                    </button>
                    <p>
                      <b>{cart.cartQuantity}</b>
                    </p>
                    <button
                      className='--btn'
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  className='--btn --btn-danger'
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet</p>
            ) : (
              <>
                {filteredReviews.map((userReview, index) => {
                  const { rate, review, reviewDate, userName } = userReview;
                  return (
                    <div className={styles.review}>
                      <StarsRating value={rate} disabled />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>By: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
