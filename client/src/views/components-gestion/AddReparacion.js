import React from "react";
import feathersClient from "../../feathersClient";
import Forms from "../components/Forms";
import validate from "./ValidationReparacion";

function AddReparacion({ dialog, close, setSnackbar, setActivo }) {
    const { inputs, errors, handleInputChange, handleSubmit } = Forms(
        submit,
        validate,
        dialog
    );

    function submit() {
        feathersClient
            .service("api/reparaciones")
            .create({
                km: inputs.km || "0",
                reparacion: capitalize(inputs.reparacion),
                repuestos: capitalize(inputs.repuestos),
                costo: inputs.costo || "0",
                labor: inputs.labor || "0",
                createdAt: Date(),
                updatedAt: Date(),
                vehiculoId: dialog.id
            })
            .then(data => {
                feathersClient
                    .service("api/clientes")
                    .patch(dialog.clienteId, {
                        createdAt: data.createdAt
                    })
                    .then(datac => {})
                    .catch(error => {
                        console.error(error);
                    });
                setActivo(activo => ({
                    ...activo,
                    id: data.vehiculoId
                }));
                setSnackbar("Reparacion creada");
                close();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const capitalize = text => {
        if (typeof text !== "string") return "";
        return text.charAt(0).toUpperCase() + text.substring(1);
    };

    const date = new Date();
    const options = {
        month: "long",
        day: "numeric"
    };
    let fecha = Intl.DateTimeFormat("default", options).format(date);

    return (
        <form
            onSubmit={handleSubmit}
            id="addReparacion"
            className="dialog"
            noValidate
        >
            <div className="dialog__head">
                <h5 className="title">Nueva reparacion</h5>
                <div className="info">
                    <i className="material-icons md-dark md-24">
                        directions_car
                    </i>
                    {dialog.patente}
                </div>
            </div>
            <ul>
                <li id="fecha">
                    <span>Fecha</span>
                    <p>{fecha}</p>
                </li>
                <li id="ultimo">
                    <span>Ultimo servicio</span>
                    <p>{dialog.km} km</p>
                </li>
                <li id="km">
                    <span>Kilometros</span>
                    <input
                        type="number"
                        min="0000000"
                        max="9999999"
                        name="km"
                        placeholder="0"
                        value={inputs.km || ""}
                        onChange={handleInputChange}
                    />
                </li>
                <li id="reparacion" className={errors.reparacion && "error"}>
                    <span>{errors.reparacion || "Reparacion"}</span>
                    <input
                        type="text"
                        name="reparacion"
                        placeholder="-"
                        value={inputs.reparacion || ""}
                        onChange={handleInputChange}
                        autoComplete="off"
                        required
                    />
                </li>
                <li id="repuestos">
                    <span>Repuestos</span>
                    <input
                        type="text"
                        name="repuestos"
                        placeholder="-"
                        value={inputs.repuestos}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </li>
                <li id="costo">
                    <span>Precio</span>
                    <input
                        type="number"
                        min="0000000"
                        max="9999999"
                        name="costo"
                        placeholder="0"
                        value={inputs.costo || ""}
                        onChange={handleInputChange}
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
                        value={inputs.labor || ""}
                        onChange={handleInputChange}
                    />
                </li>
            </ul>
            <div className="dialog__buttons">
                <div className="dialog__total">
                    Total
                    <b>
                        $
                        {(parseInt(inputs.costo, 10) || 0) +
                            (parseInt(inputs.labor, 10) || 0)}
                    </b>
                </div>
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <input type="submit" value="Agregar" />
            </div>
        </form>
    );
}

export default AddReparacion;
