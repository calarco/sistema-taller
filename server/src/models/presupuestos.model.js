// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
    const sequelizeClient = app.get("sequelizeClient");
    const presupuestos = sequelizeClient.define(
        "presupuestos",
        {
            patente: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                set(val) {
                    this.setDataValue("patente", val.toUpperCase());
                }
            },
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
            motivo: {
                type: DataTypes.STRING,
                allowNull: false
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
            },
            repuestos: {
                type: DataTypes.JSON,
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
    presupuestos.associate = function(models) {
        presupuestos.belongsTo(models.modelos);
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return presupuestos;
};
