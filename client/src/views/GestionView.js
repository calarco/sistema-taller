import React, { useState, useEffect } from "react";
import feathersClient from "../feathersClient";
import "./Gestion.css";
import Cliente from "./components-gestion/Cliente";
import Vehiculo from "./components-gestion/Vehiculo";
import Reparaciones from "./components-gestion/Reparaciones";

function GestionView({
    dialog,
    setDialog,
    activo,
    setActivo,
    fabricantes,
    modelos
}) {
    const [clientes, setClientes] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: []
    });
    const [vehiculos, setVehiculos] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: []
    });
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState({ search: "" });

    useEffect(() => {
        setLoading(true);
        if (!busqueda.search) {
            feathersClient
                .service("api/clientes")
                .find({
                    query: {
                        $limit: 10,
                        $sort: {
                            updatedAt: -1
                        }
                    }
                })
                .then(clientes => {
                    setClientes(clientes);
                    setVehiculos({
                        total: 0,
                        limit: 0,
                        skip: 0,
                        data: []
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error);
                });
            return;
        } else {
            feathersClient
                .service("api/clientes")
                .find({
                    query: {
                        $or: [
                            { nombre: { $iLike: `${busqueda.search}%` } },
                            { apellido: { $iLike: `${busqueda.search}%` } }
                        ],
                        $limit: 10,
                        $sort: {
                            updatedAt: -1
                        }
                    }
                })
                .then(clientes => {
                    setClientes(clientes);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error);
                });
            feathersClient
                .service("api/vehiculos")
                .find({
                    query: {
                        patente: { $iLike: `${busqueda.search}%` },
                        $limit: 10,
                        $sort: {
                            updatedAt: -1
                        }
                    }
                })
                .then(vehiculos => {
                    setVehiculos(vehiculos);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("error", error);
                });
            return;
        }
    }, [busqueda]);

    useEffect(() => {
        const updateSearch = text => {
            if (text === undefined) {
                setBusqueda(busqueda => ({
                    ...busqueda
                }));
            } else if (text === false) {
                setBusqueda({ search: "" });
            } else {
                setBusqueda({ search: text });
            }
        };
        feathersClient
            .service("api/clientes")
            .on("created", data => updateSearch(false));
        feathersClient
            .service("api/clientes")
            .on("patched", data => updateSearch());
        feathersClient
            .service("api/clientes")
            .on("removed", data => updateSearch());
        feathersClient
            .service("api/vehiculos")
            .on("created", data => updateSearch());
        feathersClient
            .service("api/vehiculos")
            .on("patched", data => updateSearch());
        feathersClient
            .service("api/vehiculos")
            .on("removed", data => updateSearch());
    }, []);

    const handleInputChange = event => {
        event.persist();
        setBusqueda({
            search: event.target.value
        });
        setActivo(activo => ({
            ...activo,
            lista: 0
        }));
    };

    return (
        <div id="SearchView" className="App">
            <div
                className={
                    activo.id ? "searchCard searchCard--active" : "searchCard"
                }
            >
                <form autoComplete="off" className="buscar">
                    <i className="material-icons md-dark md-24">search</i>
                    <input
                        type="search"
                        name="search"
                        placeholder="Buscar"
                        onChange={handleInputChange}
                        value={busqueda.search}
                        autoFocus
                    />
                    <div className="fab">
                        <button
                            type="button"
                            onClick={() => {
                                setDialog({ tipo: "addCliente" });
                            }}
                        >
                            <i className="material-icons md-light md-36">add</i>
                        </button>
                    </div>
                </form>
                <div className="busqueda">
                    {!clientes.data.length &&
                    !vehiculos.data.length &&
                    !loading ? (
                        <div className="empty">
                            <i className="material-icons md-dark md-inactive md-48">
                                search
                            </i>
                            <h6>No se encontraron resultados</h6>
                        </div>
                    ) : !clientes.data.length &&
                      !vehiculos.data.length &&
                      loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        undefined
                    )}
                    {!loading && clientes.data.length ? (
                        <div>
                            <ul className="busqueda__head">
                                <li>
                                    <i className="material-icons md-dark md-24">
                                        person
                                    </i>
                                    Clientes
                                </li>
                                <li>Ultimos 10</li>
                            </ul>
                            {clientes.data.map(aCliente => (
                                <Cliente
                                    key={aCliente.id}
                                    cliente={aCliente}
                                    fabricantes={fabricantes}
                                    modelos={modelos}
                                    activo={activo}
                                    setActivo={setActivo}
                                    setDialog={setDialog}
                                />
                            ))}
                        </div>
                    ) : (
                        undefined
                    )}
                    {!loading && vehiculos.data.length ? (
                        <div>
                            <ul className="busqueda__head">
                                <li>
                                    <i className="material-icons md-dark md-24">
                                        directions_car
                                    </i>
                                    Vehiculos
                                </li>
                                <li>Ultimos 10</li>
                            </ul>
                            {vehiculos.data.map(aVehiculo => (
                                <Vehiculo
                                    key={aVehiculo.id}
                                    vehiculo={aVehiculo}
                                    fabricantes={fabricantes}
                                    modelos={modelos}
                                    setActivo={setActivo}
                                    setDialog={setDialog}
                                />
                            ))}
                        </div>
                    ) : (
                        undefined
                    )}
                </div>
                <Reparaciones
                    setDialog={setDialog}
                    activo={activo}
                    setActivo={setActivo}
                />
            </div>
        </div>
    );
}

export default GestionView;
