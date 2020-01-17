// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
    const sequelizeClient = app.get("sequelizeClient");
    const reparaciones = sequelizeClient.define(
        "reparaciones",
        {
            km: {
                type: DataTypes.STRING(7),
                allowNull: false,
                validate: {
                    isInt: true,
                    isNumeric: true,
                    min: 0000000,
                    max: 9999999
                }
            },
            reparacion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            repuestos: {
                type: DataTypes.STRING,
                allowNull: false
            },
            costo: {
                type: DataTypes.STRING(7),
                allowNull: false,
                validate: {
                    isInt: true,
                    isNumeric: true,
                    min: 0000000,
                    max: 9999999
                }
            },
            labor: {
                type: DataTypes.STRING(7),
                allowNull: false,
                validate: {
                    isInt: true,
                    isNumeric: true,
                    min: 0000000,
                    max: 9999999
                }
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
    reparaciones.associate = function(models) {
        reparaciones.belongsTo(models.vehiculos);
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return reparaciones;
};
