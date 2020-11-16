import React from 'react';
import {Link} from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ isLoggedIn }) => {
    console.log(isLoggedIn)

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__left">
                        <div className="header__logo">
                            <Link to="/" className="header__logo-link">ONOI</Link>
                        </div>
                        <div className="header__logo-location">
                            Кыргызстан
                        </div>
                    </div>

                    <div className="header__right">
                        <nav className="nav">
                            <Link className="nav__link-lang" to="/g">ru</Link>
                            <Link className="nav__link-signIn" to={isLoggedIn ? "/profile/my_orders" : "/login"}>Войти</Link>
                            <Link className="nav__link-placeAd" to={isLoggedIn ? "/profile/my_profile" : "/login"}><i className="fa fa-plus"/>  Разместить</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;