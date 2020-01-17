// Initializes the `turnos` service on path `/api/turnos`
const { Turnos } = require('./turnos.class');
const createModel = require('../../models/turnos.model');
const hooks = require('./turnos.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/turnos', new Turnos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/turnos');

  service.hooks(hooks);
};
