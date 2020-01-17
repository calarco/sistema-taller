export default function validate(inputs) {
    let errors = {};
    if (!inputs.patente) {
        errors.patente = "Ingrese la patente";
    }
    if (!inputs.motivo) {
        errors.motivo = "Ingrese el motivo";
    }
    return errors;
}
