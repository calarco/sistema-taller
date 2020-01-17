import React from "react";

function Reparacion({ reparacion, setDialog }) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return (
        <div className="reparacion">
            <div className="fecha">
                {Intl.DateTimeFormat("default", options).format(
                    new Date(reparacion.createdAt)
                )}{" "}
                <i>{reparacion.km} km</i>
            </div>
            <div className="remove">
                <button
                    type="button"
                    onClick={() => {
                        setDialog({
                            tipo: "removeReparacion",
                            id: reparacion.id,
                            fecha: Intl.DateTimeFormat(
                                "default",
                                options
                            ).format(new Date(reparacion.createdAt))
                        });
                    }}
                >
                    <i className="material-icons md-dark md-24">
                        delete_outline
                    </i>
                </button>
            </div>
            <h6 className="titulo">{reparacion.reparacion}</h6>
            <p className="repuestos">{reparacion.repuestos}</p>
            <div className="costo">
                <span>Repuestos:</span>
                <b>${reparacion.costo}</b>
            </div>
            <div className="labor">
                <span>Mano de obra:</span>
                <b>${reparacion.labor}</b>
            </div>
            <div className="total">
                <span>Total:</span>
                <b>
                    $
                    {parseInt(reparacion.costo, 10) +
                        parseInt(reparacion.labor, 10)}
                </b>
            </div>
        </div>
    );
}

export default Reparacion;
