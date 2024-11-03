import React from "react";
import styles from "./Char.module.scss";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { selectOrderHistory } from "../../redux/slice/orderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);
  const array = [];
  orders.map((order) => {
    const { orderStatus } = order;
    array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((item) => item === value).length;
  };

  const placed = getOrderCount(array, "Order Placed");
  const processing = getOrderCount(array, "Processing");
  const shipped = getOrderCount(array, "Shipped");
  const delivered = getOrderCount(array, "Delivered");

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
