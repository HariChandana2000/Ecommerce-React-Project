import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  Admin,
  Cart,
  CheckoutDetails,
  Checkout,
  CheckoutSuccess,
  OrderHistory,
  OrderDetails,
  NotFound,
} from "./pages";
import { Header, Footer, ProductDetails, ReviewProducts } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/product-details/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout-details' element={<CheckoutDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/order-details/:id' element={<OrderDetails />} />
          <Route path='/review-product/:id' element={<ReviewProducts />} />

          <Route
            path='/admin/*'
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
