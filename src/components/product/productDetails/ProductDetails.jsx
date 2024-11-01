import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      setProduct({ id, ...productSnap.data() });
    } else {
      toast.error("Product not found");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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

                <div className={styles.count}>
                  <button className='--btn'>-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className='--btn'>+</button>
                </div>

                <button className='--btn --btn-danger'>Add To Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
