export default function validate(inputs) {
    let errors = {};
    if (!inputs.modelo) {
        errors.modelo = "Ingrese el modelo";
    }
    return errors;
}
