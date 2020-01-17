export default function validate(inputs) {
    let errors = {};
    if (!inputs.fabricante) {
        errors.fabricante = "Ingrese el fabricante";
    }
    return errors;
}
