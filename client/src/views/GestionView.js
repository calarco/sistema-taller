import React, { useState, useEffect } from "react";
import feathersClient from "../feathersClient";
import "./Gestion.css";
import Cliente from "./components-gestion/Cliente";
import Vehiculo from "./components-gestion/Vehiculo";
import Reparacion from "./components-gestion/Reparacion";

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
    const [reparaciones, setReparaciones] = useState({
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

    useEffect(() => {
        if (activo.id) {
            feathersClient
                .service("api/reparaciones")
                .find({
                    query: {
                        vehiculoId: activo.id,
                        $limit: 100,
                        $sort: {
                            createdAt: -1
                        }
                    }
                })
                .then(data => {
                    setReparaciones(data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [activo]);

    return (
        <div id="SearchView" className="App">
            <div
                id="searchCard"
                style={{
                    maxWidth: activo.id && "1260px"
                }}
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
                <ul id="vehiculoInfo">
                    <li>
                        <button
                            onClick={() => {
                                setActivo({ ...activo, id: "" });
                            }}
                        >
                            <i className="material-icons md-dark md-24">
                                arrow_back
                            </i>
                        </button>
                    </li>
                    <li>
                        <b>{activo.patente}</b>
                        <div>
                            <button>
                                <i className="material-icons md-dark md-18">
                                    info
                                </i>
                            </button>
                            <ul>
                                <li>
                                    {activo.vin ||
                                        "No se especificó numero de chasis"}
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <p>{activo.auto}</p>
                        <span>{activo.year}</span>
                        <i className="tag">{activo.combustible}</i>
                    </li>
                    <li className="info">
                        <i className="material-icons md-dark md-24">person</i>
                        {activo.nombre} {activo.apellido}
                    </li>
                </ul>
                <div id="reparaciones">
                    {reparaciones.data.length ? (
                        reparaciones.data.map(aReparacion => (
                            <Reparacion
                                key={aReparacion.id}
                                reparacion={aReparacion}
                                setDialog={setDialog}
                            />
                        ))
                    ) : (
                        <div className="empty">
                            <i className="material-icons md-dark md-inactive md-48">
                                build
                            </i>
                            <h6>Aún no hay reparaciones</h6>
                        </div>
                    )}
                    <div className="add">
                        <button
                            onClick={() => {
                                setDialog({
                                    tipo: "addReparacion",
                                    lista: activo.lista,
                                    id: activo.id,
                                    patente: activo.patente,
                                    km:
                                        reparaciones.data.length &&
                                        reparaciones.data[0].km
                                });
                            }}
                        >
                            <i className="material-icons md-dark md-18">add</i>{" "}
                            Nueva Reparacion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GestionView;
