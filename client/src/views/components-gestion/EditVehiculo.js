import React, { useState, useEffect } from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationVehiculo";

function EditVehiculo({ close, dialog, setSnackbar, setActivo }) {
    const [clientes, setClientes] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: []
    });

    const { inputs, errors, handleInputChange, handleSubmit } = Forms(
        submit,
        validate,
        dialog
    );

    useEffect(() => {
        if (inputs.search) {
            feathersClient
                .service("api/clientes")
                .find({
                    query: {
                        $or: [
                            { nombre: { $iLike: `${inputs.search}%` } },
                            { apellido: { $iLike: `${inputs.search}%` } }
                        ],
                        $limit: 10,
                        $sort: {
                            updatedAt: -1
                        }
                    }
                })
                .then(clientes => {
                    setClientes(clientes);
                })
                .catch(error => {
                    console.log("error", error);
                });
        } else {
            feathersClient
                .service("api/clientes")
                .find({
                    query: {
                        $or: [
                            { nombre: { $iLike: `${dialog.nombre}%` } },
                            { apellido: { $iLike: `${dialog.apellido}%` } }
                        ],
                        $limit: 10,
                        $sort: {
                            updatedAt: -1
                        }
                    }
                })
                .then(clientes => {
                    setClientes(clientes);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [inputs.search, dialog]);

    function submit() {
        feathersClient
            .service("api/vehiculos")
            .patch(dialog.id, {
                vin: inputs.vin.toUpperCase() || "",
                updatedAt: Date(),
                clienteId: inputs.clienteId
            })
            .then(data => {
                feathersClient
                    .service("api/clientes")
                    .patch(data.clienteId, {
                        updatedAt: Date()
                    })
                    .then(datac => {})
                    .catch(error => {
                        console.error(error);
                    });
                setActivo(activo => ({
                    ...activo,
                    lista: data.clienteId,
                    id: data.id,
                    patente: data.patente,
                    vin: data.vin,
                    clienteId: data.clienteId,
                    nombre: dialog.nombre,
                    apellido: dialog.apellido
                }));
                setSnackbar("Vehiculo guardado");
                close();
            })
            .catch(error => {
                if (error.code === 400) {
                    document.getElementById("patente").className = "error";
                }
                console.error(error);
            });
    }

    return (
        <form
            onSubmit={handleSubmit}
            id="editVehiculo"
            className="dialog"
            noValidate
        >
            <div className="dialog__head">
                <h5 className="title">Editar vehiculo</h5>
                <div className="info">
                    <i className="material-icons md-dark md-24">
                        directions_car
                    </i>
                    {dialog.patente}
                </div>
            </div>
            <ul>
                <li>
                    <span>Propietario</span>
                    <input
                        type="search"
                        name="search"
                        list="datalist"
                        placeholder="Buscar"
                        value={inputs.search || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </li>
                <ul id="datalist">
                    {clientes.data.length ? (
                        clientes.data.map(aCliente => (
                            <li key={aCliente.id}>
                                <input
                                    type="radio"
                                    name="clienteId"
                                    value={aCliente.id}
                                    onChange={handleInputChange}
                                    id={aCliente.id}
                                    checked={
                                        aCliente.id === inputs.clienteId
                                            ? true
                                            : false
                                    }
                                    required
                                />
                                <label htmlFor={aCliente.id}>
                                    <b>
                                        {aCliente.nombre +
                                            " " +
                                            aCliente.apellido}
                                    </b>
                                </label>
                            </li>
                        ))
                    ) : (
                        <div className="empty">
                            <i className="material-icons md-dark md-inactive md-48">
                                search
                            </i>
                            <h6>No se encontraron clientes</h6>
                        </div>
                    )}
                </ul>
                <div id="vin" className={errors.vin && "error"}>
                    <span>{errors.vin || "VIN"}</span>
                    <input
                        type="text"
                        name="vin"
                        placeholder="-"
                        form="AddVehiculoForm"
                        value={inputs.vin || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
            </ul>
            <div className="dialog__buttons">
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <input
                    type="submit"
                    value="Guardar"
                    disabled={inputs.clienteId ? false : true}
                />
            </div>
        </form>
    );
}

export default EditVehiculo;
