import React, { useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import Card from "../../components/card/Card";
import { CountryDropdown } from "react-country-region-selector";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = () => {};

  const handleBilling = () => {};

  const handleSubmit = () => {};

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label>Recipient Name:</label>
              <input
                type='text'
                name='name'
                value={shippingAddress.name}
                placeholder='Recipient name'
                required
                onChange={(e) => handleShipping(e)}
              />

              <label>Address Line 1:</label>
              <input
                type='text'
                name='line1'
                value={shippingAddress.line1}
                placeholder='Address Line 1'
                required
                onChange={(e) => handleShipping(e)}
              />

              <label>Address Line 2:</label>
              <input
                type='text'
                name='line2'
                value={shippingAddress.line2}
                placeholder='Address Line 2'
                required
                onChange={(e) => handleShipping(e)}
              />

              <label>City:</label>
              <input
                type='text'
                name='city'
                value={shippingAddress.city}
                placeholder='City'
                required
                onChange={(e) => handleShipping(e)}
              />

              <label>State:</label>
              <input
                type='text'
                name='state'
                value={shippingAddress.state}
                placeholder='State'
                required
                onChange={(e) => handleShipping(e)}
              />

              <label>Postal Code:</label>
              <input
                type='text'
                name='postal_code'
                value={shippingAddress.postal_code}
                placeholder='Postal code'
                required
                onChange={(e) => handleShipping(e)}
              />

              {/*Country Input*/}
              <label>Country: </label>
              <CountryDropdown
                valueType='short'
                className={styles.select}
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />

              <label>Phone:</label>
              <input
                type='text'
                name='phone'
                value={shippingAddress.phone}
                placeholder='Phone'
                required
                onChange={(e) => handleShipping(e)}
              />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
