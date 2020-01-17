import React from "react";
import feathersClient from "../../feathersClient";

function RemoveCliente({ close, dialog, setSnackbar, activo, setActivo }) {
    const removeCliente = clienteId => {
        feathersClient
            .service("api/clientes")
            .remove(clienteId)
            .then(removed2 => {
                feathersClient
                    .service("api/vehiculos")
                    .remove(null, {
                        query: {
                            clienteId: null
                        }
                    })
                    .then(vremoved => {
                        feathersClient
                            .service("api/reparaciones")
                            .remove(null, {
                                query: {
                                    vehiculoId: null
                                }
                            })
                            .then(removed1 => {
                                if (activo.clienteId === clienteId) {
                                    setActivo(activo => ({
                                        ...activo,
                                        id: ""
                                    }));
                                }
                                if (activo.lista === clienteId) {
                                    setActivo(activo => ({
                                        ...activo,
                                        lista: 0
                                    }));
                                }
                                setSnackbar("Cliente eliminado");
                                close();
                            })
                            .catch(error => {
                                console.error(error);
                            });
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
        <div id="removeCliente" className="dialog">
            <p className="body">
                ¿Borrar cliente {dialog.nombre} {dialog.apellido} y sus
                vehiculos asociados?
            </p>
            <div className="dialog__buttons">
                <button type="button" onClick={() => close()}>
                    Cancelar
                </button>
                <button
                    className="remove"
                    onClick={() => {
                        removeCliente(dialog.id);
                    }}
                >
                    Borrar
                </button>
            </div>
        </div>
    );
}

export default RemoveCliente;
