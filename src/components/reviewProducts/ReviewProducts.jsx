import React, { useEffect, useState } from "react";
import styles from "./ReviewProducts.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserId, selectUsername } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";

const ReviewProducts = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const { document } = useFetchDocument("products", id);
  const [product, setProduct] = useState(null);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUsername);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userId,
      userName,
      productId: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Rate This Product</h2>
        {product === null ? (
          <img src={spinnerImg} alt='spinner' style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product Name:</b> {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}
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
