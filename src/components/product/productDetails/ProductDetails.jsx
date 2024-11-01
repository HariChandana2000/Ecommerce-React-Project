import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      setProduct(productSnap.data());
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return <div>ProductDetails</div>;
};

export default ProductDetails;
