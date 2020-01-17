import React from "react";
import feathersClient from "../../feathersClient";

function RemoveVehiculo({ close, dialog, setSnackbar, activo, setActivo }) {
    const removeVehiculo = vehiculoId => {
        feathersClient
            .service("api/reparaciones")
            .remove(null, {
                query: {
                    vehiculoId: vehiculoId
                }
            })
            .then(removed1 => {
                feathersClient
                    .service("api/vehiculos")
                    .remove(vehiculoId)
                    .then(removed2 => {
                        if (activo.id === removed2.id) {
                            setActivo(activo => ({
                                ...activo,
                                id: ""
                            }));
                        }
                        setSnackbar("Vehiculo eliminado");
                        close();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });

        return;
    };

    return (
        <div id="removeVehiculo" className="dialog">
            <p className="body">¿Borrar vehiculo {dialog.patente}?</p>
            <div className="dialog__buttons">
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <button
                    className="remove"
                    onClick={() => {
                        removeVehiculo(dialog.id);
                    }}
                >
                    Borrar
                </button>
            </div>
        </div>
    );
}

export default RemoveVehiculo;
