import React, { useState, useEffect } from "react";
import feathersClient from "../feathersClient";
import "./Turnos.css";

function TurnosView({ setDialog, fabricantes, modelos }) {
    const [loading, setLoading] = useState(true);
    const [turnos, setTurnos] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: []
    });

    function loadTurnos() {
        feathersClient
            .service("api/turnos")
            .find({
                query: {
                    fecha: {
                        $gt: new Date().getTime() - 24 * 60 * 60 * 1000
                    },
                    $limit: 50,
                    $sort: {
                        fecha: 1
                    }
                }
            })
            .then(data => {
                setTurnos(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        (async function makeAsync() {
            setLoading(true);
            await loadTurnos();
            setLoading(false);
        })();
        feathersClient
            .service("api/turnos")
            .on("created", data => loadTurnos());
        feathersClient
            .service("api/turnos")
            .on("removed", data => loadTurnos());
    }, []);

    const formatDay = date => {
        const fecha = new Date(date);
        const options = {
            weekday: "short"
        };
        return Intl.DateTimeFormat("default", options).format(fecha);
    };

    const formatDate = date => {
        const fecha = new Date(date);
        const options = {
            day: "numeric"
        };
        return Intl.DateTimeFormat("default", options).format(fecha);
    };

    const formatMonth = date => {
        const fecha = new Date(date);
        const options = {
            month: "long"
        };
        return Intl.DateTimeFormat("default", options).format(fecha);
    };

    const matchModelo = modeloId => {
        try {
            return (
                fabricantes.data.find(
                    ({ id }) =>
                        id ===
                        modelos.data.find(({ id }) => id === modeloId)
                            .fabricanteId
                ).nombre +
                " " +
                modelos.data.find(({ id }) => id === modeloId).nombre
            );
        } catch {
            return "ERROR";
        }
    };

    let lastFecha;
    let lastMes;

    return (
        <div id="TurnosView" className="App">
            <div id="turnos">
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                ) : turnos.data.length ? (
                    turnos.data.map(aTurno => (
                        <div
                            key={aTurno.id}
                            className={
                                lastFecha === aTurno.fecha
                                    ? "turno"
                                    : "turno turno--date"
                            }
                        >
                            {new Date(lastMes).getMonth() ===
                            new Date(aTurno.fecha).getMonth() ? (
                                undefined
                            ) : (
                                <div className="turno__mes">
                                    {formatMonth((lastMes = aTurno.fecha))}
                                </div>
                            )}
                            <ul>
                                {lastFecha === aTurno.fecha ? (
                                    <li className="turno__fecha"> </li>
                                ) : (
                                    <li className="turno__fecha">
                                        <div className="day">
                                            {formatDay(aTurno.fecha)}
                                        </div>
                                        <div className="date">
                                            {formatDate(
                                                (lastFecha = aTurno.fecha)
                                            )}
                                        </div>
                                    </li>
                                )}
                                <li className="turno__cuerpo">
                                    {aTurno.motivo}
                                    <span>
                                        {" "}
                                        - {matchModelo(aTurno.modeloId)}
                                    </span>
                                </li>
                                <li className="remove">
                                    <button
                                        type="button"
                                        className="remove"
                                        onClick={() => {
                                            setDialog({
                                                tipo: "removeTurno",
                                                id: aTurno.id,
                                                fecha: formatDate(aTurno.fecha),
                                                mes: formatMonth(aTurno.fecha),
                                                auto: matchModelo(
                                                    aTurno.modeloId
                                                )
                                            });
                                        }}
                                    >
                                        <i className="material-icons md-dark md-24">
                                            delete_outline
                                        </i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="empty">
                        <i className="material-icons md-dark md-inactive md-48">
                            event
                        </i>
                        <h6>No hay turnos agendados</h6>
                    </div>
                )}
            </div>
            <div className="fab">
                <button
                    type="button"
                    onClick={() => {
                        setDialog({
                            tipo: "addTurno"
                        });
                    }}
                >
                    <i className="material-icons md-light md-36">add</i>
                </button>
            </div>
        </div>
    );
}

export default TurnosView;
