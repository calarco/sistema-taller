import React from "react";
import feathersClient from "../../feathersClient";
import Forms from "./Forms";
import validate from "./ValidationModelo";

function Modelo({ temps, setTemps, current, dialog, setSnackbar }) {
    const { inputs, errors, handleInputChange, handleSubmit } = Forms(
        submit,
        validate,
        dialog
    );

    function submit() {
        feathersClient
            .service("api/modelos")
            .create({
                nombre: capitalize(inputs.modelo),
                createdAt: Date(),
                updatedAt: Date(),
                fabricanteId: temps.fabricanteId
            })
            .then(modelo => {
                setSnackbar("Modelo agregado");
                setTemps(temps => ({
                    ...temps,
                    modeloId: modelo.id
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }

    const capitalize = text => {
        if (typeof text !== "string") return "";
        return text
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
    };

    return (
        <form
            onSubmit={handleSubmit}
            id="newModelo"
            className={errors.modelo && "error"}
            noValidate
        >
            <span>{errors.modelo || "Nuevo modelo"}</span>
            <div>
                <button
                    type="button"
                    style={{
                        display: !current.data.length && "none"
                    }}
                    onClick={() =>
                        setTemps(temps => ({
                            ...temps,
                            modeloId: current.data[0].id
                        }))
                    }
                >
                    <i className="material-icons md-dark md-18">chevron_left</i>
                </button>
                <input
                    type="text"
                    name="modelo"
                    placeholder="-"
                    value={inputs.modelo || ""}
                    onChange={handleInputChange}
                    id="modeloInput"
                    autoFocus
                    required
                />
                <button type="submit">
                    <i className="material-icons md-dark md-18">done</i>
                </button>
            </div>
        </form>
    );
}

export default Modelo;
