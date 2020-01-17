import React from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationCliente";

function AddCliente({ close, dialog, setSnackbar, setActivo }) {
    const capitalize = text => {
        if (typeof text !== "string") return "";
        return text
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
    };

    const { inputs, errors, handleInputChange, handleSubmit } = Forms(
        submit,
        validate,
        dialog
    );

    function submit() {
        if (dialog.id) {
            feathersClient
                .service("api/clientes")
                .patch(dialog.id, {
                    nombre: capitalize(inputs.nombre),
                    apellido: capitalize(inputs.apellido),
                    telefono: inputs.telefono2
                        ? inputs.telefono1 + " " + inputs.telefono2
                        : inputs.telefono1,
                    direccion: capitalize(inputs.direccion),
                    empresa: inputs.empresa,
                    updatedAt: Date()
                })
                .then(data => {
                    setActivo({ lista: data.id });
                    setSnackbar("Cliente guardado");
                    close();
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            feathersClient
                .service("api/clientes")
                .create({
                    nombre: capitalize(inputs.nombre),
                    apellido: capitalize(inputs.apellido),
                    telefono: inputs.telefono2
                        ? inputs.telefono1 + " " + inputs.telefono2
                        : inputs.telefono1,
                    direccion: capitalize(inputs.direccion),
                    empresa: inputs.empresa,
                    createdAt: Date(),
                    updatedAt: Date()
                })
                .then(data => {
                    setActivo({ lista: data.id });
                    setSnackbar("Cliente creado");
                    close();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            id="addCliente"
            className="dialog"
            noValidate
        >
            <div className="dialog__head">
                <h5 className="title">
                    {dialog.id ? "Editar" : "Nuevo"} cliente
                </h5>
            </div>
            <ul>
                <li id="nombre" className={errors.nombre && "error"}>
                    <span>{errors.nombre || "Nombre"}</span>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="-"
                        value={inputs.nombre || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                    />
                </li>
                <li id="apellido">
                    <span>Apellido</span>
                    <input
                        type="text"
                        name="apellido"
                        placeholder="-"
                        value={inputs.apellido || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </li>
                <li id="telefono1" className={errors.telefono1 && "error"}>
                    <span>{errors.telefono1 || "Telefono 1"}</span>
                    <input
                        type="tel"
                        pattern="\d*"
                        title="Telefono 1"
                        name="telefono1"
                        placeholder="-"
                        value={inputs.telefono1 || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </li>
                <li id="telefono2">
                    <span>Telefono 2</span>
                    <input
                        type="tel"
                        name="telefono2"
                        placeholder="-"
                        value={inputs.telefono2 || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </li>
                <li id="direccion">
                    <span>Direccion</span>
                    <input
                        type="text"
                        name="direccion"
                        placeholder="-"
                        value={inputs.direccion || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </li>
                <li id="empresa">
                    <span>Empresa</span>
                    <input
                        type="text"
                        name="empresa"
                        placeholder="-"
                        value={inputs.empresa || ""}
                        onChange={handleInputChange}
                    />
                </li>
            </ul>
            <div className="dialog__buttons">
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <input
                    type="submit"
                    value={dialog.id ? "Guardar" : "Agregar"}
                />
            </div>
        </form>
    );
}

export default AddCliente;
