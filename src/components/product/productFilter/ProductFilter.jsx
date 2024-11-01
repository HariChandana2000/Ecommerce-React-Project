import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
} from "../../../redux/slice/filterSlice";

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [products, brand, dispatch]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  return (
    <div className={styles.filter}>
      <h4>Categrories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type='button'
              className={`${category}` === cat ? styles.active : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250;{cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brd, index) => {
            return (
              <option key={index} value={brd}>
                {brd}
              </option>
            );
          })}
        </select>
      </div>
      <h4>Price</h4>
      <p>$1500</p>
      <div className={styles.price}>
        <input type='range' name='price' min={100} max={1000} />
      </div>
      <br />
      <button className='--btn --btn-danger'>Clear Filters</button>
    </div>
  );
};

export default ProductFilter;
