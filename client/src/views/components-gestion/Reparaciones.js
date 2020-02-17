import React, { useState, useEffect } from "react";
import feathersClient from "../../feathersClient";
import Reparacion from "./Reparacion";

function Reparaciones({
    dialog,
    setDialog,
    activo,
    setActivo,
    fabricantes,
    modelos
}) {
    const [reparaciones, setReparaciones] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: []
    });

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
            feathersClient
                .service("api/clientes")
                .get(activo.clienteId)
                .then(nCliente => {
                    setActivo(activo => ({
                        ...activo,
                        telefonos: nCliente.telefono,
                        direccion: nCliente.direccion,
                        empresa: nCliente.empresa
                    }));
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [activo, setActivo]);

    return (
        <>
            <ul id="vehiculoInfo">
                <li>
                    <button
                        className="back"
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
                            <i className="material-icons md-dark md-18">info</i>
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
                    <button>
                        <i className="material-icons md-dark md-24">person</i>
                        {activo.nombre} {activo.apellido}
                    </button>
                    <ul>
                        <li>
                            <i className="material-icons md-dark md-18">
                                phone
                            </i>
                            <div>
                                <p>{activo.telefonos}</p>
                                <span>Telefonos</span>
                            </div>
                        </li>
                        {activo.direccion && (
                            <li>
                                <i className="material-icons md-dark md-18">
                                    house
                                </i>
                                <div>
                                    <p>{activo.direccion}</p>
                                    <span>Direccion</span>
                                </div>
                            </li>
                        )}
                        {activo.empresa && (
                            <li>
                                <i className="material-icons md-dark md-18">
                                    work
                                </i>
                                <div>
                                    <p>{activo.empresa}</p>
                                    <span>Empresa</span>
                                </div>
                            </li>
                        )}
                    </ul>
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
        </>
    );
}

export default Reparaciones;
