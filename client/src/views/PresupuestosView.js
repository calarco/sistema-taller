import React, { useState, useEffect } from "react";
import feathersClient from "../feathersClient";
import { renderEmail, Email } from "react-html-email";
import "./Presupuestos.css";
import Mensaje from "./components-presupuestos/Mensaje";

function PresupuestosView({
    user,
    setDialog,
    setSnackbar,
    activo,
    setActivo,
    fabricantes,
    modelos
}) {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState({
        presupuestos: true,
        email: false
    });
    const [presupuestos, setPresupuestos] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: []
    });

    function loadPresupuestos() {
        feathersClient
            .service("api/presupuestos")
            .find({
                query: {
                    $limit: 50,
                    $sort: {
                        createdAt: -1
                    }
                }
            })
            .then(data => {
                setPresupuestos(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        (async function makeAsync() {
            setLoading({ presupuestos: true });
            await loadPresupuestos();
            setLoading({ presupuestos: false });
        })();
        feathersClient
            .service("api/presupuestos")
            .on("created", data => loadPresupuestos());
        feathersClient
            .service("api/presupuestos")
            .on("removed", data => loadPresupuestos());
    }, []);

    const handleEmail = event => {
        event.preventDefault();
        setLoading({ email: true });
        feathersClient
            .service("api/emails")
            .create({
                to: inputs.email,
                subject: "Servicio Especializado | Gabriel Mezzanotte",
                html: renderEmail(
                    <Email title="Presupuesto">
                        <Mensaje
                            user={user}
                            presupuesto={activo.presupuesto}
                            auto={matchModelo(activo.presupuesto.modeloId)}
                        />
                    </Email>
                )
            })
            .then(data => {
                setSnackbar("Presupuesto enviado a " + data.accepted[0]);
                setInputs({});
                setLoading({ email: false });
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleInputChange = event => {
        event.persist();
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };

    const formatDate = date => {
        const fecha = new Date(date);
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric"
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

    return (
        <div id="PresupuestosView" className="App">
            <div
                id="presupuestos"
                className="mainCard"
                style={{
                    maxWidth: activo.presupuesto && "100%"
                }}
            >
                <div id="listaHead">
                    <h6>Presupuestos</h6>
                    <div className="fab">
                        <button
                            type="button"
                            onClick={() => {
                                setDialog({
                                    tipo: "addPresupuesto"
                                });
                            }}
                        >
                            <i className="material-icons md-light md-36">add</i>
                        </button>
                    </div>
                </div>
                <div id="lista">
                    {loading.presupuestos === true ? (
                        <div className="loading">
                            <div className="spinner"></div>
                        </div>
                    ) : presupuestos.data.length ? (
                        presupuestos.data.map(aPresupuesto => (
                            <div className="presupuesto" key={aPresupuesto.id}>
                                <ul
                                    onClick={() =>
                                        setActivo(activo => ({
                                            ...activo,
                                            presupuesto: aPresupuesto
                                        }))
                                    }
                                >
                                    <li>
                                        {formatDate(aPresupuesto.createdAt)}
                                    </li>
                                    <li>
                                        <b>{aPresupuesto.patente}</b>
                                        <span>
                                            {matchModelo(aPresupuesto.modeloId)}
                                        </span>
                                    </li>
                                </ul>
                                <li className="remove">
                                    <button
                                        type="button"
                                        className="remove"
                                        onClick={() => {
                                            setDialog({
                                                tipo: "removePresupuesto",
                                                id: aPresupuesto.id,
                                                patente: aPresupuesto.patente,
                                                fecha: formatDate(
                                                    aPresupuesto.createdAt
                                                )
                                            });
                                        }}
                                    >
                                        <i className="material-icons md-dark md-24">
                                            delete_outline
                                        </i>
                                    </button>
                                </li>
                            </div>
                        ))
                    ) : (
                        <div className="empty">
                            <i className="material-icons md-dark md-inactive md-48">
                                event
                            </i>
                            <h6>No se confeccionaron presupuestos</h6>
                        </div>
                    )}
                </div>
                <div id="mensajeHead">
                    <button
                        onClick={() => {
                            setActivo({ ...activo, presupuesto: "" });
                        }}
                    >
                        <i className="material-icons md-dark md-24">
                            arrow_back
                        </i>
                    </button>
                    {loading.email === true ? (
                        <div className="spinner"></div>
                    ) : (
                        <form onSubmit={handleEmail} className="enviar">
                            <input
                                type="email"
                                name="email"
                                placeholder="Direccion de correo"
                                value={inputs.email || ""}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit">Enviar</button>
                        </form>
                    )}
                </div>
                <div
                    id="mensaje"
                    style={{
                        maxHeight: activo.presupuesto && "1000px"
                    }}
                >
                    {activo.presupuesto && (
                        <Mensaje
                            user={user}
                            presupuesto={activo.presupuesto}
                            auto={matchModelo(activo.presupuesto.modeloId)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PresupuestosView;
