// Initializes the `presupuestos` service on path `/api/presupuestos`
const { Presupuestos } = require('./presupuestos.class');
const createModel = require('../../models/presupuestos.model');
const hooks = require('./presupuestos.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/presupuestos', new Presupuestos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/presupuestos');

  service.hooks(hooks);
};
