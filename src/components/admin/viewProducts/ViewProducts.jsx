import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");

      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(allProducts);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No Products Found!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>${price}</td>
                    <td>
                      <Link to='/admin/add-product'>
                        <FaEdit size={20} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt size={20} color='red' />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
