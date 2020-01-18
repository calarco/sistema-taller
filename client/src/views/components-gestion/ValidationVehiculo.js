export default function validate(inputs) {
    let errors = {};
    if (!inputs.patente) {
        errors.patente = "Ingrese la patente";
    }
    if (inputs.vin && inputs.vin.length !== 17) {
        errors.vin = "El VIN debe contener 17 caracteres";
    } else if (/\s/.test(inputs.vin)) {
        errors.vin = "El vin no puede contener espacios";
    } else if (inputs.vin.toUpperCase().includes("O")) {
        errors.vin = "El vin no puede contener la letra O";
    } else if (inputs.vin.toUpperCase().includes("I")) {
        errors.vin = "El vin no puede contener la letra I";
    } else if (inputs.vin.toUpperCase().includes("Q")) {
        errors.vin = "El vin no puede contener la letra Q";
    }
    return errors;
}
