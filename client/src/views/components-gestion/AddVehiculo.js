import React, { useState, useEffect } from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationVehiculo";
import Modelo from "../components/Modelo";
import Fabricante from "../components/Fabricante";

function AddVehiculo({
    close,
    dialog,
    setSnackbar,
    fabricantes,
    modelos,
    setActivo
}) {
    const [current, setCurrent] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: [{}]
    });

    const {
        inputs,
        setInputs,
        errors,
        handleInputChange,
        handleSubmit
    } = Forms(submit, validate, dialog);

    useEffect(() => {
        if (!inputs.fabricanteId) {
            if (fabricantes.data.length) {
                setInputs(inputs => ({
                    ...inputs,
                    fabricanteId: fabricantes.data[0].id
                }));
            } else {
                setInputs(inputs => ({
                    ...inputs,
                    fabricanteId: "nuevo"
                }));
            }
        }
    }, [fabricantes]);

    useEffect(() => {
        if (inputs.fabricanteId !== "nuevo") {
            const newModelos = modelos.data.filter(
                e => e.fabricanteId === parseInt(inputs.fabricanteId, 10)
            );
            setCurrent({
                total: 0,
                limit: 0,
                skip: 0,
                data: newModelos
            });
            if (newModelos.length) {
                setInputs(inputs => ({
                    ...inputs,
                    modeloId: newModelos[0].id
                }));
            } else {
                setInputs(inputs => ({
                    ...inputs,
                    modeloId: "nuevo"
                }));
            }
        }
    }, [inputs.fabricanteId, modelos]);

    function submit() {
        feathersClient
            .service("api/vehiculos")
            .create({
                patente: inputs.patente.toUpperCase(),
                year: inputs.year || "2019",
                combustible: inputs.combustible || "Nafta",
                vin: inputs.vin.toUpperCase() || "",
                createdAt: Date(),
                updatedAt: Date(),
                clienteId: dialog.clienteId,
                modeloId: inputs.modeloId
            })
            .then(data => {
                feathersClient
                    .service("api/clientes")
                    .patch(data.clienteId, {
                        createdAt: Date()
                    })
                    .then(datac => {})
                    .catch(error => {
                        console.error(error);
                    });
                setActivo({
                    lista: data.clienteId,
                    id: data.id,
                    patente: data.patente,
                    year: data.year,
                    combustible: data.combustible,
                    clienteId: data.clienteId,
                    nombre: dialog.nombre,
                    apellido: dialog.apellido,
                    auto:
                        document.getElementById("fabricantes")
                            .selectedOptions[0].text +
                        " " +
                        document.getElementById("modelos").selectedOptions[0]
                            .text,
                    km: "0"
                });
                setSnackbar("Vehiculo creado");
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
        <div id="addVehiculo" className="dialog">
            <div className="dialog__head">
                <h5 className="title">Nuevo vehiculo</h5>
                <div className="info">
                    <i className="material-icons md-dark md-24">person</i>
                    {dialog.nombre} {dialog.apellido}
                </div>
            </div>
            <ul>
                <li id="patente" className={errors.patente && "error"}>
                    <span>{errors.patente || "Patente"}</span>
                    <input
                        type="text"
                        name="patente"
                        placeholder="-"
                        form="AddVehiculoForm"
                        value={inputs.patente || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                    />
                </li>
                <li id="year">
                    <span>Año</span>
                    <input
                        type="number"
                        min="1900"
                        max="9999"
                        name="year"
                        placeholder="-"
                        form="AddVehiculoForm"
                        value={inputs.year || "2019"}
                        onChange={handleInputChange}
                    />
                </li>
                <li id="combustible">
                    <span>Combustible</span>
                    <select
                        name="combustible"
                        form="AddVehiculoForm"
                        value={inputs.combustible || "Nafta"}
                        onChange={handleInputChange}
                    >
                        <option value="Nafta">Nafta</option>
                        <option value="Diesel">Diesel</option>
                        <option value="GNC">GNC</option>
                    </select>
                </li>
                <li className="tipo">
                    {inputs.fabricanteId === "nuevo" ? (
                        <Fabricante
                            setTemps={setInputs}
                            fabricantes={fabricantes}
                            dialog={dialog}
                            setSnackbar={setSnackbar}
                        />
                    ) : (
                        <div id="fabricante">
                            <span>Fabricante</span>
                            <div>
                                <select
                                    name="fabricanteId"
                                    form="AddVehiculoForm"
                                    value={inputs.fabricanteId}
                                    onChange={handleInputChange}
                                    id="fabricantes"
                                >
                                    {fabricantes.data.map(aFabricante => (
                                        <option
                                            key={aFabricante.id}
                                            value={aFabricante.id}
                                        >
                                            {aFabricante.nombre}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInputs(inputs => ({
                                            ...inputs,
                                            fabricanteId: "nuevo"
                                        }));
                                    }}
                                >
                                    <i className="material-icons md-dark md-18">
                                        add
                                    </i>
                                </button>
                            </div>
                        </div>
                    )}
                    {inputs.modeloId === "nuevo" &&
                    inputs.fabricanteId !== "nuevo" ? (
                        <Modelo
                            temps={inputs}
                            setTemps={setInputs}
                            current={current}
                            dialog={dialog}
                            setSnackbar={setSnackbar}
                        />
                    ) : inputs.modeloId !== "nuevo" &&
                      inputs.fabricanteId !== "nuevo" ? (
                        <div id="modelo">
                            <span>Modelo</span>
                            <div>
                                <select
                                    name="modeloId"
                                    form="AddVehiculoForm"
                                    value={inputs.modeloId}
                                    onChange={handleInputChange}
                                    id="modelos"
                                >
                                    {current.data.map(aModelo => (
                                        <option
                                            key={aModelo.id || 0}
                                            value={aModelo.id}
                                        >
                                            {aModelo.nombre}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInputs(inputs => ({
                                            ...inputs,
                                            modeloId: "nuevo"
                                        }));
                                    }}
                                >
                                    <i className="material-icons md-dark md-18">
                                        add
                                    </i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        undefined
                    )}
                </li>
            </ul>
            <form
                onSubmit={handleSubmit}
                id="AddVehiculoForm"
                className="dialog__buttons"
                noValidate
            >
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
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <input
                    type="submit"
                    value="Agregar"
                    disabled={
                        inputs.modeloId === "nuevo" ||
                        inputs.fabricanteId === "nuevo"
                            ? true
                            : false
                    }
                />
            </form>
        </div>
    );
}

export default AddVehiculo;
