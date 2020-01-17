// Initializes the `clientes` service on path `/api/clientes`
const { Clientes } = require('./clientes.class');
const createModel = require('../../models/clientes.model');
const hooks = require('./clientes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/clientes', new Clientes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/clientes');

  service.hooks(hooks);
};
