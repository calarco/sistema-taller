export default function validate(inputs) {
    let errors = {};
    if (!inputs.reparacion) {
        errors.reparacion = "Ingrese la reparacion";
    }
    return errors;
}
