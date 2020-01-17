import React from "react";
import feathersClient from "../../feathersClient";
import Forms from "./Forms";
import validate from "./ValidationFabricante";

function Fabricante({ setTemps, fabricantes, dialog, setSnackbar }) {
    const { inputs, errors, handleInputChange, handleSubmit } = Forms(
        submit,
        validate,
        dialog
    );

    function submit() {
        feathersClient
            .service("api/fabricantes")
            .create({
                nombre: capitalize(inputs.fabricante),
                createdAt: Date(),
                updatedAt: Date()
            })
            .then(fabricante => {
                setSnackbar("Fabricante agregado");
                setTemps(temps => ({
                    ...temps,
                    fabricanteId: fabricante.id
                }));
            })
            .catch(error => {
                if (error.code === 400) {
                    document
                        .getElementById("newFabricante")
                        .classList.add("error");
                }
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
            id="newFabricante"
            className={errors.fabricante && "error"}
            noValidate
        >
            <span>{errors.fabricante || "Nuevo fabricante"}</span>

            <div>
                <button
                    type="button"
                    style={{
                        display: !fabricantes.data.length && "none"
                    }}
                    onClick={() =>
                        setTemps(temps => ({
                            ...temps,
                            fabricanteId: fabricantes.data[0].id
                        }))
                    }
                >
                    <i className="material-icons md-dark md-18">chevron_left</i>
                </button>
                <input
                    type="text"
                    name="fabricante"
                    placeholder="Nuevo"
                    value={inputs.fabricante || ""}
                    onChange={handleInputChange}
                    id="fabricanteInput"
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

export default Fabricante;
