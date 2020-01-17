// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get("sequelizeClient");
  const turnos = sequelizeClient.define(
    "turnos",
    {
      fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      motivo: {
        type: DataTypes.STRING,
        allowNull: false
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
  turnos.associate = function(models) {
    turnos.belongsTo(models.modelos);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return turnos;
};
