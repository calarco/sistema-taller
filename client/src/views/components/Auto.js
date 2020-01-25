import React, { useState, useEffect } from "react";
import Modelo from "../components/Modelo";
import Fabricante from "../components/Fabricante";

function Auto({
    dialog,
    setSnackbar,
    fabricantes,
    modelos,
    inputs,
    setInputs
}) {
    const [current, setCurrent] = useState({
        total: 0,
        limit: 0,
        skip: 0,
        data: [{}]
    });

    const handleInputChange = event => {
        event.persist();
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };

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

    return (
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
                            <i className="material-icons md-dark md-18">add</i>
                        </button>
                    </div>
                </div>
            )}
            {inputs.fabricanteId === "nuevo" ? (
                undefined
            ) : inputs.modeloId === "nuevo" ? (
                <Modelo
                    temps={inputs}
                    setTemps={setInputs}
                    current={current}
                    dialog={dialog}
                    setSnackbar={setSnackbar}
                />
            ) : (
                <div id="modelo">
                    <span>Modelo</span>
                    <div>
                        <select
                            name="modeloId"
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
                            <i className="material-icons md-dark md-18">add</i>
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}

export default Auto;
