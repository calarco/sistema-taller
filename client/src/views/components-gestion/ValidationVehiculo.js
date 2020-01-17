export default function validate(inputs) {
    let errors = {};
    if (!inputs.patente) {
        errors.patente = "Ingrese la patente";
    }
    if (inputs.vin && inputs.vin.length !== 17) {
        errors.vin = "El VIN debe contener 17 caracteres";
    }
    return errors;
}
