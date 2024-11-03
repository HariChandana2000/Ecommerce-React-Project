import React, { useState } from "react";
import styles from "./ReviewProducts.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";
import { selectUserId, selectUsername } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import StarsRating from "react-star-rate";

const ReviewProducts = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const products = useSelector(selectProducts);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUsername);

  const product = products.find((item) => item.id === id);

  const submitReview = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Rate This Product</h2>
        <p>
          <b>Product Name:</b> {product.name}
        </p>
        <img
          src={product.imageURL}
          alt={product.name}
          style={{ width: "100px" }}
        />
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating value={rate} onChange={(rate) => setRate(rate)} />
            <label>Review:</label>
            <textarea
              value={review}
              cols='30'
              rows='10'
              required
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button type='submit' className='--btn --btn-primary'>
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
