import React, { useState } from "react";
import feathersClient from "../feathersClient";
import { Link } from "react-router-dom";

function Login({ user, setUser }) {
    const [inputs, setInputs] = useState({
        user: "",
        password: "",
        loading: false
    });

    const handleSubmit = event => {
        event.preventDefault();
        setInputs({ ...inputs, loading: true });
        feathersClient
            .authenticate({
                strategy: "local",
                email: inputs.user,
                password: inputs.password
            })
            .then(({ user }) => setUser(user))
            .catch(error => {
                console.error(error);
                setInputs({
                    ...inputs,
                    password: "",
                    loading: false
                });
            });
    };

    const handleInputChange = event => {
        event.persist();
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <div id="Login">
            <form onSubmit={handleSubmit} className="dialog">
                <div className="dialog__head">
                    <h5 className="title">Iniciar sesion</h5>
                </div>
                <ul>
                    <li>
                        <span>Usuario</span>
                        <input
                            type="text"
                            name="user"
                            value={inputs.user}
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <span>Contraseña</span>
                        <input
                            type="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleInputChange}
                        />
                    </li>
                </ul>
                <div className="dialog__buttons">
                    {inputs.loading ? (
                        <div className="spinner"></div>
                    ) : (
                        undefined
                    )}

                    <Link to="/" className="buttonLink">
                        Cancelar
                    </Link>
                    <input
                        type="submit"
                        value="Ingresar"
                        disabled={inputs.loading ? true : false}
                    />
                </div>
            </form>
        </div>
    );
}

export default Login;
