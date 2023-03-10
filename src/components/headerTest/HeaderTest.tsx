import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";


import { useEffect } from "react";



const logo = (
    <div className={styles.logo}>
        <Link to="/">
            <h2>
                e<span>Shop</span>.
            </h2>
        </Link>
    </div>
);


// @ts-ignore
const activeLink = ({ isActive } ) => (isActive ? `${styles.active}` : "");

const HeaderTest = () => {
    const [showMenu, setShowMenu] = useState(false);



    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const hideMenu = () => {
        setShowMenu(false);
    };



    const cart = (
        <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
    );

    return (
        <>
            <header>
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
                                <FaTimes size={22} color="#fff" onClick={hideMenu} />
                            </li>
                            <li>
                                <NavLink to="/" className={activeLink}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={activeLink}>
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                        <div className={styles["headerTest-right"]} onClick={hideMenu}>
              <span className={styles.links}>

                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>





                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>


                  <NavLink to="/">
                    Logout
                  </NavLink>

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
        </>
    );
};

export default HeaderTest;