export default function validate(inputs) {
    let errors = {};
    if (!inputs.nombre) {
        errors.nombre = "Ingrese un nombre";
    }
    if (!inputs.telefono1) {
        errors.telefono1 = "Ingrese un numero de telefono";
    }
    return errors;
}
