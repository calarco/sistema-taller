// Initializes the `vheiculos` service on path `/api/vehiculos`
const { Vehiculos } = require("./vehiculos.class");
const createModel = require("../../models/vehiculos.model");
const hooks = require("./vehiculos.hooks");

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate,
    multi: true
  };

  // Initialize our service with any options it requires
  app.use("/api/vehiculos", new Vehiculos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/vehiculos");

  service.hooks(hooks);
};
