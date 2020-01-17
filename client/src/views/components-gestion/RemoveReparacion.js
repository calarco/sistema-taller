import React from "react";
import feathersClient from "../../feathersClient";

function RemoveReparacion({ close, dialog, setSnackbar, setActivo }) {
    const removeReparacion = reparacionId => {
        feathersClient
            .service("api/reparaciones")
            .remove(reparacionId)
            .then(removed => {
                setActivo(activo => ({
                    ...activo,
                    id: removed.vehiculoId
                }));
                setSnackbar("Reparacion eliminada");
                close();
            })
            .catch(error => {
                console.error(error);
            });
        return;
    };

    return (
        <div id="removeReparacion" className="dialog">
            <p className="body">¿Borrar reparacion del {dialog.fecha}?</p>
            <div className="dialog__buttons">
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <button
                    className="remove"
                    onClick={() => {
                        removeReparacion(dialog.id);
                    }}
                >
                    Borrar
                </button>
            </div>
        </div>
    );
}

export default RemoveReparacion;
