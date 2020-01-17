import React from "react";
import feathersClient from "../../feathersClient";

function RemovePresupuesto({ close, dialog, setSnackbar, activo, setActivo }) {
    const removePresupuesto = presupuestoId => {
        feathersClient
            .service("api/presupuestos")
            .remove(presupuestoId)
            .then(removed => {
                if (removed.id === activo.presupuesto.id) {
                    setActivo({ ...activo, presupuesto: "" });
                }
                setSnackbar("Presupuesto eliminado");
                close();
            })
            .catch(error => {
                console.error(error);
            });
        return;
    };

    return (
        <div id="removePresupuesto" className="dialog">
            <p className="body">
                ¿Borrar presupuesto para {dialog.patente} del {dialog.fecha}?
            </p>
            <div className="dialog__buttons">
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <button
                    className="remove"
                    onClick={() => {
                        removePresupuesto(dialog.id);
                    }}
                >
                    Borrar
                </button>
            </div>
        </div>
    );
}

export default RemovePresupuesto;
