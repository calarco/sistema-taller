import React from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationVehiculo";
import Auto from "../components/Auto";

function AddVehiculo({
    close,
    dialog,
    setSnackbar,
    fabricantes,
    modelos,
    setActivo
}) {
    const {
        inputs,
        setInputs,
        errors,
        handleInputChange,
        handleSubmit
    } = Forms(submit, validate, dialog);

    function submit() {
        feathersClient
            .service("api/vehiculos")
            .create({
                patente: inputs.patente.toUpperCase(),
                year: inputs.year || "2019",
                combustible: inputs.combustible || "Nafta",
                vin: (inputs.vin || "").toUpperCase(),
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
                <Auto
                    dialog={dialog}
                    setSnackbar={setSnackbar}
                    fabricantes={fabricantes}
                    modelos={modelos}
                    inputs={inputs}
                    setInputs={setInputs}
                />
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
