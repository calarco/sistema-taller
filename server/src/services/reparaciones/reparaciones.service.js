// Initializes the `reparaciones` service on path `/api/reparaciones`
const { Reparaciones } = require("./reparaciones.class");
const createModel = require("../../models/reparaciones.model");
const hooks = require("./reparaciones.hooks");

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate,
    multi: true
  };

  // Initialize our service with any options it requires
  app.use("/api/reparaciones", new Reparaciones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/reparaciones");

  service.hooks(hooks);
};
