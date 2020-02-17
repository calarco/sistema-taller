import React from "react";
import "./Header.css";
import logo from "../../logo.svg";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../App";

function Header() {
    return (
        <header className="header">
            <div>
                <div className="header__logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="links">
                    <NavLink
                        exact
                        to="/"
                        activeClassName="header__link--active"
                        className="header__link"
                    >
                        <i className="material-icons md-dark md-24">build</i>
                        <span>Gestion</span>
                    </NavLink>
                    <NavLink
                        to="/turnos"
                        activeClassName="header__link--active"
                        className="header__link"
                    >
                        <i className="material-icons md-dark md-24">
                            date_range
                        </i>
                        <span>Turnos</span>
                    </NavLink>
                    <NavLink
                        to="/presupuestos"
                        activeClassName="header__link--active"
                        className="header__link"
                    >
                        <i className="material-icons md-dark md-24">poll</i>
                        <span>Presupuestos</span>
                    </NavLink>
                </div>
                <AuthContext.Consumer>
                    {({ user, setUser }) => (
                        <button
                            type="button"
                            className="header__logout"
                            onClick={() => {
                                window.localStorage.removeItem("feathers-jwt");
                                setUser(null);
                            }}
                        >
                            <i className="material-icons md-dark md-24">
                                exit_to_app
                            </i>
                            <span>{user.email}</span>
                        </button>
                    )}
                </AuthContext.Consumer>
                <div className="header__footer">© 2019</div>
            </div>
        </header>
    );
}

export default Header;
