import React from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationTurno";
import Auto from "../components/Auto";

function AddTurno({ close, dialog, setSnackbar, fabricantes, modelos }) {
    const {
        inputs,
        setInputs,
        errors,
        handleInputChange,
        handleSubmit
    } = Forms(submit, validate, dialog);

    const currentDate = fecha => {
        let date = new Date();
        let day = date.getDate();
        if (day < 10) day = "0" + day;
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let year = date.getFullYear();
        return year + "-" + month + "-" + day;
    };

    const capitalize = text => {
        if (typeof text !== "string") return "";
        return text.charAt(0).toUpperCase() + text.substring(1);
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
