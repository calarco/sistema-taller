import React from "react";
import feathersClient from "../../feathersClient";

function RemoveTurno({ close, dialog, setSnackbar }) {
    const removeTurno = turnoId => {
        feathersClient
            .service("api/turnos")
            .remove(turnoId)
            .then(removed => {
                setSnackbar("Turno eliminado");
                close();
            })
            .catch(error => {
                console.error(error);
            });
        return;
    };

    return (
        <div id="removeTurno" className="dialog">
            <p className="body">
                ¿Borrar turno del {dialog.fecha} de {dialog.mes} para{" "}
                {dialog.auto}?
            </p>
            <div className="dialog__buttons">
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <button
                    className="remove"
                    onClick={() => {
                        removeTurno(dialog.id);
                    }}
                >
                    Borrar
                </button>
            </div>
        </div>
    );
}

export default RemoveTurno;
