import React, { useState, useEffect } from "react";
import feathersClient from "../../feathersClient";

function Vehiculo({
    vehiculo,
    cliente,
    fabricantes,
    modelos,
    setActivo,
    setDialog
}) {
    const [info, setInfo] = useState({});

    useEffect(() => {
        if (cliente) {
            setInfo(cliente);
        } else {
            feathersClient
                .service("api/clientes")
                .get(vehiculo.clienteId)
                .then(nCliente => {
                    setInfo(nCliente);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [cliente, vehiculo]);

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
        <div className="vehiculo">
            <ul
                onClick={() =>
                    setActivo({
                        lista: info.id,
                        id: vehiculo.id,
                        patente: vehiculo.patente,
                        year: vehiculo.year,
                        combustible: vehiculo.combustible,
                        vin: vehiculo.vin,
                        clienteId: info.id,
                        nombre: info.nombre,
                        apellido: info.apellido,
                        auto: matchModelo(vehiculo.modeloId)
                    })
                }
            >
                <li>
                    <i className="material-icons md-dark md-24">
                        chevron_right
                    </i>
                </li>
                <li>
                    <p>
                        <b>{vehiculo.patente}</b>
                    </p>
                </li>
                <li>
                    <p>
                        <i className="tag">{vehiculo.combustible}</i>
                        {matchModelo(vehiculo.modeloId)}
                        <span> - {vehiculo.year}</span>
                    </p>
                </li>
            </ul>
            <div className="options">
                <button>
                    <i className="material-icons md-dark md-24">more_vert</i>
                </button>
                <ul>
                    <li
                        onClick={() => {
                            setDialog({
                                tipo: "editVehiculo",
                                id: vehiculo.id,
                                patente: vehiculo.patente,
                                vin: vehiculo.vin,
                                clienteId: info.id,
                                nombre: info.nombre,
                                apellido: info.apellido
                            });
                        }}
                    >
                        <i className="material-icons md-dark md-18">edit</i>
                        Editar
                    </li>
                    <li
                        onClick={() => {
                            setDialog({
                                tipo: "removeVehiculo",
                                id: vehiculo.id,
                                patente: vehiculo.patente
                            });
                        }}
                    >
                        <i className="material-icons md-dark md-18">delete</i>
                        Borrar
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Vehiculo;
