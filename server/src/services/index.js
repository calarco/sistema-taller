const users = require('./users/users.service.js');
const fabricantes = require('./fabricantes/fabricantes.service.js');
const modelos = require('./modelos/modelos.service.js');
const clientes = require('./clientes/clientes.service.js');
const vehiculos = require('./vehiculos/vehiculos.service.js');
const reparaciones = require('./reparaciones/reparaciones.service.js');
const turnos = require('./turnos/turnos.service.js');
const emails = require('./emails/emails.service.js');
const presupuestos = require('./presupuestos/presupuestos.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(fabricantes);
  app.configure(modelos);
  app.configure(clientes);
  app.configure(vehiculos);
  app.configure(reparaciones);
  app.configure(turnos);
  app.configure(emails);
  app.configure(presupuestos);
};
