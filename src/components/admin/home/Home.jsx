import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import InfoBox from "../../infoBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALCULATE_TOTAL_ORDER_AMOUNT,
  selectOrderHistory,
  selectTotalOrderAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Chart from "../../chart/Chart";

//Icons
const earningsIcon = <AiFillDollarCircle size={30} color='#b624ff' />;
const productsIcon = <BsCart4 size={30} color='#1f93ff' />;
const ordersIcon = <FaCartArrowDown size={30} color='orangered' />;

const Home = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const dispatch = useDispatch();
  const fbProducts = useFetchCollection("products");
  const fbOrders = useFetchCollection("orders");

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: fbProducts.data }));
    dispatch(STORE_ORDERS(fbOrders.data));
    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
  }, [fbProducts, fbOrders, dispatch]);

  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title='Earnings'
          count={`$${totalOrderAmount}`}
          icon={earningsIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title='Products'
          count={products.length}
          icon={productsIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title='Orders'
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
