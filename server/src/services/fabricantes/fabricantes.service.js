// Initializes the `fabricantes` service on path `/api/fabricantes`
const { Fabricantes } = require("./fabricantes.class");
const createModel = require("../../models/fabricantes.model");
const hooks = require("./fabricantes.hooks");

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate: {
      default: 50,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use("/api/fabricantes", new Fabricantes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/fabricantes");

  service.hooks(hooks);
};
