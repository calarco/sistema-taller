import React, { useState, useEffect } from "react";
import feathersClient from "../../feathersClient";
import Vehiculo from "./Vehiculo";

function Cliente({
    cliente,
    fabricantes,
    modelos,
    activo,
    setActivo,
    setDialog
}) {
    const [vehiculos, setVehiculos] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: []
    });

    const telefonos = (cliente.telefono || " ").split(" ");
    const telefono1 = telefonos[0];
    const telefono2 = telefonos[1];

    useEffect(() => {
        if (cliente.id) {
            feathersClient
                .service("api/vehiculos")
                .find({
                    query: {
                        $limit: 100,
                        clienteId: cliente.id
                    }
                })
                .then(vehiculos => {
                    setVehiculos(vehiculos);
                })
                .catch(error => {
                    console.error(error);
                });
            return;
        }
    }, [cliente]);

    return (
        <div
            className={
                activo.lista === cliente.id ? "cliente activo" : "cliente"
            }
        >
            <div className="clienteDiv">
                <ul
                    onClick={() =>
                        activo.lista === cliente.id
                            ? setActivo(activo => ({
                                  ...activo,
                                  lista: 0
                              }))
                            : setActivo(activo => ({
                                  ...activo,
                                  lista: cliente.id
                              }))
                    }
                >
                    <li>
                        <i className="material-icons md-dark md-24">
                            {activo.lista === cliente.id
                                ? "expand_less"
                                : "expand_more"}
                        </i>
                    </li>
                    <li>
                        <p>
                            <b>
                                {cliente.nombre} {cliente.apellido}
                            </b>
                        </p>
                        <p>
                            <span> {cliente.empresa}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            <i className="material-icons md-dark md-18">
                                phone
                            </i>
                            {cliente.telefono}
                        </p>
                        {cliente.direccion && (
                            <p>
                                <i className="material-icons md-dark md-18">
                                    house
                                </i>
                                <span>{cliente.direccion}</span>
                            </p>
                        )}
                    </li>
                </ul>
                <div className="options">
                    <button>
                        <i className="material-icons md-dark md-24">
                            more_vert
                        </i>
                    </button>
                    <ul>
                        <li
                            onClick={() => {
                                setDialog({
                                    tipo: "addCliente",
                                    id: cliente.id,
                                    nombre: cliente.nombre,
                                    apellido: cliente.apellido,
                                    telefono1: telefono1,
                                    telefono2: telefono2,
                                    direccion: cliente.direccion,
                                    empresa: cliente.empresa
                                });
                            }}
                        >
                            <i className="material-icons md-dark md-18">edit</i>
                            Editar
                        </li>
                        <li
                            onClick={() => {
                                setDialog({
                                    tipo: "removeCliente",
                                    id: cliente.id,
                                    nombre: cliente.nombre,
                                    apellido: cliente.apellido
                                });
                            }}
                        >
                            <i className="material-icons md-dark md-18">
                                delete
                            </i>
                            Borrar
                        </li>
                    </ul>
                </div>
            </div>
            <div className="subList">
                {vehiculos.data.length ? (
                    <div className="vehiculos">
                        {vehiculos.data.map(aVehiculo => (
                            <Vehiculo
                                key={aVehiculo.id}
                                vehiculo={aVehiculo}
                                cliente={cliente}
                                fabricantes={fabricantes}
                                modelos={modelos}
                                setActivo={setActivo}
                                setDialog={setDialog}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <i className="material-icons md-dark md-inactive md-48">
                            directions_car
                        </i>
                        <span>Sin vehiculos</span>
                    </div>
                )}
                <div className="add">
                    <button
                        onClick={() => {
                            setDialog({
                                tipo: "addVehiculo",
                                clienteId: cliente.id,
                                nombre: cliente.nombre,
                                apellido: cliente.apellido
                            });
                        }}
                    >
                        <i className="material-icons md-dark md-18">add</i>
                        Nuevo Vehiculo
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cliente;
