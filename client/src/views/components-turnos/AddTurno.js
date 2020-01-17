import React, { useState, useEffect } from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationTurno";
import Modelo from "../components/Modelo";
import Fabricante from "../components/Fabricante";

function AddTurno({ close, dialog, setSnackbar, fabricantes, modelos }) {
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

    const currentDate = fecha => {
        let date = new Date();
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let year = date.getFullYear();
        return year + "-" + month + "-" + day;
    };

    function submit() {
        feathersClient
            .service("api/turnos")
            .create({
                fecha: (inputs.fecha || currentDate()) + " 23:59:59",
                motivo: capitalize(inputs.motivo),
                createdAt: Date(),
                updatedAt: Date(),
                modeloId: inputs.modeloId
            })
            .then(data => {
                setSnackbar("Turno creado");
                close();
            })
            .catch(error => {
                if (error.code === 400) {
                    document.getElementById("patente").className = "error";
                }
                console.error(error);
            });
    }

    const capitalize = text => {
        if (typeof text !== "string") return "";
        return text.charAt(0).toUpperCase() + text.substring(1);
    };

    return (
        <div id="addTurno" className="dialog">
            <ul>
                <h5 className="title">Nuevo turno</h5>
                <li id="fecha">
                    <span>Fecha</span>
                    <input
                        type="date"
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        name="fecha"
                        placeholder="-"
                        form="AddTurnoForm"
                        value={inputs.fecha || currentDate()}
                        onChange={handleInputChange}
                        required
                    />
                </li>
                <li id="motivo" className={errors.motivo && "error"}>
                    <span>{errors.motivo || "Motivo"}</span>
                    <input
                        type="text"
                        name="motivo"
                        placeholder="-"
                        form="AddTurnoForm"
                        value={inputs.motivo || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                    />
                </li>
                <li className="tipo">
                    <div id="fabricante">
                        <span>Fabricante</span>
                        <div>
                            <select
                                name="fabricanteId"
                                form="AddTurnoForm"
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
                    <div id="modelo">
                        <span>Modelo</span>
                        <div>
                            <select
                                name="modeloId"
                                form="AddTurnoForm"
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
                    {inputs.fabricanteId === "nuevo" ? (
                        <Fabricante
                            setTemps={setInputs}
                            fabricantes={fabricantes}
                            dialog={dialog}
                            setSnackbar={setSnackbar}
                        />
                    ) : inputs.modeloId === "nuevo" ? (
                        <Modelo
                            temps={inputs}
                            setTemps={setInputs}
                            current={current}
                            dialog={dialog}
                            setSnackbar={setSnackbar}
                        />
                    ) : (
                        undefined
                    )}
                </li>
            </ul>
            <form
                onSubmit={handleSubmit}
                id="AddTurnoForm"
                className="dialog__buttons"
                noValidate
            >
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

export default AddTurno;
