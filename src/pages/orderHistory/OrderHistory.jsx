import React from "react";
import styles from "./OrderHistory.module.scss";
import useFetchCollection from "../../customHooks/useFetchCollection";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");

  return <div>OrderHistory</div>;
};

export default OrderHistory;
