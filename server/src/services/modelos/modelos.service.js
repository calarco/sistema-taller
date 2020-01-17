// Initializes the `modelos` service on path `/api/modelos`
const { Modelos } = require("./modelos.class");
const createModel = require("../../models/modelos.model");
const hooks = require("./modelos.hooks");

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate: {
      default: 100,
      max: 200
    }
  };

  // Initialize our service with any options it requires
  app.use("/api/modelos", new Modelos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("api/modelos");

  service.hooks(hooks);
};
