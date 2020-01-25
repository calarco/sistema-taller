import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import feathersClient from "./feathersClient";
import Login from "./views/Login";
import Header from "./views/components/Header";
import GestionView from "./views/GestionView";
import TurnosView from "./views/TurnosView";
import PresupuestosView from "./views/PresupuestosView";
import Dialogs from "./views/components/Dialogs";

export const AuthContext = React.createContext({
    setUser: () => {},
    user: null
});

function App() {
    const [user, setUser] = useState(null);
    const [activo, setActivo] = useState({});
    const [dialog, setDialog] = useState({});
    const [snackbar, setSnackbar] = useState("");
    const [loading, setLoading] = useState(true);
    const [fabricantes, setFabricantes] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: [{}]
    });
    const [modelos, setModelos] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: [{}]
    });

    function loadCars() {
        feathersClient
            .service("api/fabricantes")
            .find({
                query: {
                    $limit: 100,
                    $sort: {
                        nombre: 1
                    }
                }
            })
            .then(fabricantes => {
                setFabricantes(fabricantes);
                feathersClient
                    .service("api/modelos")
                    .find({
                        query: {
                            $limit: 200,
                            $sort: {
                                nombre: 1
                            }
                        }
                    })
                    .then(modelos => {
                        setModelos(modelos);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (window.localStorage.getItem("feathers-jwt")) {
            (async function anyNameFunction() {
                await feathersClient
                    .authenticate()
                    .then(({ user }) => setUser(user))
                    .catch(console.log);
                setLoading(false);
            })();
        } else {
            setLoading(false);
        }
        feathersClient
            .service("api/fabricantes")
            .on("created", data => loadCars());
        feathersClient.service("api/modelos").on("created", data => loadCars());
    }, []);

    useEffect(() => {
        loadCars();
    }, [user]);

    useEffect(() => {
        if (snackbar !== "") {
            setTimeout(function() {
                document
                    .getElementById("snackbar")
                    .classList.remove("snackbar--show");
            }, 5000);
            setTimeout(function() {
                setSnackbar("");
            }, 5500);
        }
    }, [snackbar]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                {loading ? (
                    <div>
                        <div className="headBar"></div>
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    </div>
                ) : user ? (
                    <div>
                        <Header />
                        <div className="headBar"></div>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <GestionView
                                        {...props}
                                        dialog={dialog}
                                        setDialog={setDialog}
                                        activo={activo}
                                        setActivo={setActivo}
                                        fabricantes={fabricantes}
                                        modelos={modelos}
                                    />
                                )}
                            />
                            <Route
                                path="/turnos"
                                render={props => (
                                    <TurnosView
                                        {...props}
                                        setDialog={setDialog}
                                        fabricantes={fabricantes}
                                        modelos={modelos}
                                    />
                                )}
                            />
                            <Route
                                path="/presupuestos"
                                render={props => (
                                    <PresupuestosView
                                        {...props}
                                        user={user.email}
                                        setDialog={setDialog}
                                        setSnackbar={setSnackbar}
                                        activo={activo}
                                        setActivo={setActivo}
                                        fabricantes={fabricantes}
                                        modelos={modelos}
                                    />
                                )}
                            />
                        </Switch>
                        <Dialogs
                            dialog={dialog}
                            setDialog={setDialog}
                            setSnackbar={setSnackbar}
                            activo={activo}
                            setActivo={setActivo}
                            fabricantes={fabricantes}
                            modelos={modelos}
                        />
                        <div
                            id="snackbar"
                            className={
                                snackbar !== ""
                                    ? "snackbar snackbar--show"
                                    : "snackbar"
                            }
                        >
                            {snackbar}
                        </div>
                    </div>
                ) : (
                    <Login user={user} setUser={setUser} />
                )}
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
