import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/HiddenLink";
import AdminOnlyRoute, {
  AdminOnlyLink,
} from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = (
    <span className={styles.cart}>
      <Link to='/cart'>
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener("scroll", fixNavbar);

  //Monitor currently signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);

          setUserName(uName);
        } else {
          setUserName(user.displayName.split(" ")[0]);
        }
        console.log(user);

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            username: userName,
            userId: user.uid,
          })
        );
      } else {
        setUserName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <header className={scrollPage ? styles.fixed : null}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu} />
            </li>
            <li>
              <AdminOnlyLink>
                <Link to='/admin/home'>
                  <button className='--btn --btn-primary'>Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to='/' className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink className={activeLink} to='/login'>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href='#' style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />
                  Hi, {userName}
                </a>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink className={activeLink} to='/order-history'>
                  My Orders
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to='/' onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
