// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get("sequelizeClient");
  const fabricantes = sequelizeClient.define(
    "fabricantes",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  fabricantes.associate = function(models) {
    models.modelos.belongsTo(fabricantes);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return fabricantes;
};
