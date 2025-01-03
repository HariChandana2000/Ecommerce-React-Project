import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { auth } from "../../firebase/config";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast.success("Logged in successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
        setIsLoading(false);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Logged in successfully");
        const user = result.user;
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt='login' width='400' />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>
                Login
              </button>
              <div className={styles.links}>
                <Link to='/reset'>Forgot Password</Link>
              </div>
              <p>-- or --</p>
              <button
                className='--btn --btn-danger --btn-block'
                onClick={signInWithGoogle}
              >
                <FaGoogle color='#fff' style={{ marginRight: "10px" }} />
                Login With Google
              </button>
              <span className={styles.register}>
                <p>Don't have an account?</p>
                <Link to='/register'>Register</Link>
              </span>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
