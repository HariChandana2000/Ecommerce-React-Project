import React, { useState } from "react";
import styles from "./ChangeOrderStatus.module.scss";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const editOrder = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const orderConfig = {
      ...order,
      orderStatus: status,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Order status changed");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Order Status</h4>
          <form onSubmit={(e) => editOrder(e)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='' disabled>
                  -- Choose one --
                </option>
                <option value='Order Placed'>Order Placed</option>
                <option value='Processing'>Processing</option>
                <option value='Shipped'>Shipped</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </span>
            <span>
              <button type='submit' className='--btn --btn-primary'>
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
