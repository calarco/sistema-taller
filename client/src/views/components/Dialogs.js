import React from "react";
import "./Dialogs.css";
import AddCliente from "../components-gestion/AddCliente";
import RemoveCliente from "../components-gestion/RemoveCliente";
import AddVehiculo from "../components-gestion/AddVehiculo";
import EditVehiculo from "../components-gestion/EditVehiculo";
import RemoveVehiculo from "../components-gestion/RemoveVehiculo";
import AddReparacion from "../components-gestion/AddReparacion";
import RemoveReparacion from "../components-gestion/RemoveReparacion";
import AddTurno from "../components-turnos/AddTurno";
import RemoveTurno from "../components-turnos/RemoveTurno";
import AddPresupuesto from "../components-presupuestos/AddPresupuesto";
import RemovePresupuesto from "../components-presupuestos/RemovePresupuesto";

function Dialogs({
    dialog,
    setDialog,
    setSnackbar,
    activo,
    setActivo,
    fabricantes,
    modelos
}) {
    const close = () => {
        document.getElementById("overlay").classList.remove("overlay--show");
        document.getElementById("dialogs").classList.remove("dialogs--show");
        setTimeout(function() {
            setDialog({});
        }, 500);
    };

    return (
        <>
            <div
                id="overlay"
                className={dialog.tipo ? "overlay overlay--show" : "overlay"}
                onClick={() => close()}
            ></div>
            <div
                id="dialogs"
                className={dialog.tipo ? "dialogs dialogs--show" : "dialogs"}
            >
                {dialog.tipo === "addCliente" && (
                    <AddCliente
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        setActivo={setActivo}
                    />
                )}
                {dialog.tipo === "addVehiculo" && (
                    <AddVehiculo
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        setActivo={setActivo}
                        fabricantes={fabricantes}
                        modelos={modelos}
                    />
                )}
                {dialog.tipo === "editVehiculo" && (
                    <EditVehiculo
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        setActivo={setActivo}
                    />
                )}
                {dialog.tipo === "addReparacion" && (
                    <AddReparacion
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        setActivo={setActivo}
                    />
                )}
                {dialog.tipo === "removeCliente" && (
                    <RemoveCliente
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        activo={activo}
                        setActivo={setActivo}
                    />
                )}
                {dialog.tipo === "removeVehiculo" && (
                    <RemoveVehiculo
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        activo={activo}
                        setActivo={setActivo}
                    />
                )}
                {dialog.tipo === "removeReparacion" && (
                    <RemoveReparacion
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        setActivo={setActivo}
                    />
                )}
                {dialog.tipo === "addTurno" && (
                    <AddTurno
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        fabricantes={fabricantes}
                        modelos={modelos}
                    />
                )}
                {dialog.tipo === "removeTurno" && (
                    <RemoveTurno
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                    />
                )}
                {dialog.tipo === "addPresupuesto" && (
                    <AddPresupuesto
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        activo={activo}
                        setActivo={setActivo}
                        fabricantes={fabricantes}
                        modelos={modelos}
                    />
                )}
                {dialog.tipo === "removePresupuesto" && (
                    <RemovePresupuesto
                        close={close}
                        dialog={dialog}
                        setSnackbar={setSnackbar}
                        activo={activo}
                        setActivo={setActivo}
                    />
                )}
            </div>
        </>
    );
}

export default Dialogs;
