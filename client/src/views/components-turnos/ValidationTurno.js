export default function validate(inputs) {
    let errors = {};
    if (!inputs.motivo) {
        errors.motivo = "Ingrese el motivo";
    }
    return errors;
}
