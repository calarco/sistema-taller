import React, { useState } from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationPresupuesto";
import Auto from "../components/Auto";

function AddPresupuesto({
    close,
    dialog,
    setSnackbar,
    fabricantes,
    modelos,
    activo,
    setActivo
}) {
    const [repuestos, setRepuestos] = useState([]);

    const {
        inputs,
        setInputs,
        errors,
        handleInputChange,
        handleSubmit
    } = Forms(submit, validate, dialog);

    function submit() {
        feathersClient
            .service("api/presupuestos")
            .create({
                patente: inputs.patente.toUpperCase(),
                km: inputs.km || "0",
                motivo: capitalize(inputs.motivo),
                labor: inputs.labor || "0",
                repuestos: repuestos,
                createdAt: Date(),
                updatedAt: Date(),
                modeloId: inputs.modeloId
            })
            .then(data => {
                setActivo({ ...activo, presupuesto: data });
                setSnackbar("Presupuesto creado");
                close();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleRepuestos = event => {
        event.preventDefault();
        const newRepuestos = [
            ...repuestos,
            {
                cantidad: inputs.cantidad || "1",
                repuesto: capitalize(inputs.repuesto),
                precio: parseInt(inputs.precio, 10) || "0"
            }
        ];
        setRepuestos(newRepuestos);
        setInputs(inputs => ({
            ...inputs,
            cantidad: 1,
            repuesto: "",
            precio: 0
        }));
    };

    const removeRepuesto = index => {
        const newRepuestos = [...repuestos];
        newRepuestos.splice(index, 1);
        setRepuestos(newRepuestos);
    };

    const capitalize = text => {
        if (typeof text !== "string") return "";
        return text.charAt(0).toUpperCase() + text.substring(1);
    };

    return (
        <div id="addPresupuesto" className="dialog">
            <div className="dialog__head">
                <h5 className="title">Nuevo presupuesto</h5>
            </div>
            <ul>
                <li id="patente" className={errors.patente && "error"}>
                    <span>{errors.patente || "Patente"}</span>
                    <input
                        type="text"
                        name="patente"
                        placeholder="-"
                        value={inputs.patente || ""}
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
                <li id="km">
                    <span>Kilometros</span>
                    <input
                        type="number"
                        min="0000000"
                        max="9999999"
                        name="km"
                        placeholder="0"
                        form="AddPresupuestoForm"
                        value={inputs.km || ""}
                        onChange={handleInputChange}
                    />
                </li>
                <li id="reparacion" className={errors.motivo && "error"}>
                    <span>{errors.motivo || "Motivo"}</span>
                    <input
                        type="text"
                        name="motivo"
                        placeholder="-"
                        form="AddPresupuestoForm"
                        value={inputs.motivo || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                    />
                </li>
                <li id="labor">
                    <span>Mano de Obra</span>
                    <input
                        type="number"
                        min="0000000"
                        max="9999999"
                        name="labor"
                        placeholder="0"
                        form="AddPresupuestoForm"
                        value={inputs.labor || ""}
                        onChange={handleInputChange}
                    />
                </li>
                <form onSubmit={handleRepuestos} id="repuestos">
                    <ul id="columnHeader">
                        <li>Cantidad</li>
                        <li>Repuesto</li>
                        <li>Precio</li>
                        <li></li>
                    </ul>
                    {repuestos.length ? (
                        repuestos.map((aRepuesto, index) => (
                            <ul key={index}>
                                <li>{aRepuesto.cantidad}</li>
                                <li>{aRepuesto.repuesto}</li>
                                <li>{aRepuesto.precio}$</li>
                                <button
                                    type="button"
                                    onClick={() => removeRepuesto(index)}
                                >
                                    <i className="material-icons md-dark md-18">
                                        delete
                                    </i>
                                </button>
                            </ul>
                        ))
                    ) : (
                        <div className="empty">No se detallan repuestos</div>
                    )}
                    <ul id="addRepuesto">
                        <li id="cantidad">
                            <input
                                type="number"
                                min="000001"
                                max="999999"
                                name="cantidad"
                                placeholder="1"
                                value={inputs.cantidad | "1"}
                                onChange={handleInputChange}
                            />
                        </li>
                        <li id="">
                            <input
                                type="text"
                                name="repuesto"
                                placeholder="Repuesto"
                                value={inputs.repuesto || ""}
                                onChange={handleInputChange}
                                autoComplete="off"
                                required
                            />
                        </li>
                        <li id="costo">
                            <input
                                type="number"
                                min="0000000"
                                max="9999999"
                                name="precio"
                                placeholder="0"
                                value={inputs.precio || ""}
                                onChange={handleInputChange}
                            />
                        </li>
                        <button type="submit" onClick={() => {}}>
                            <i className="material-icons md-dark md-18">add</i>
                        </button>
                    </ul>
                </form>
            </ul>
            <form
                onSubmit={handleSubmit}
                id="AddPresupuestoForm"
                className="dialog__buttons"
                noValidate
            >
                <div className="dialog__total">
                    Total
                    <b>
                        $
                        {(parseInt(inputs.labor, 10) || 0) +
                            repuestos.reduce(
                                (a, { precio }) => a + parseInt(precio, 10),
                                0
                            )}
                    </b>
                </div>
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <input
                    type="submit"
                    value="Guardar"
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

export default AddPresupuesto;
