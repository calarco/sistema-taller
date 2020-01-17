// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
    const sequelizeClient = app.get("sequelizeClient");
    const vehiculos = sequelizeClient.define(
        "vehiculos",
        {
            patente: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                set(val) {
                    this.setDataValue("patente", val.toUpperCase());
                }
            },
            year: {
                type: DataTypes.STRING(4),
                allowNull: false,
                validate: {
                    isInt: true,
                    isNumeric: true,
                    min: 1800,
                    max: 4000
                }
            },
            combustible: {
                type: DataTypes.ENUM(
                    "Nafta",
                    "Diesel",
                    "GNC",
                    "Electrico",
                    "Hibrido"
                ),
                allowNull: false,
                defaultValue: "Nafta"
            },
            vin: {
                type: DataTypes.STRING(17),
                allowNull: true
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
    vehiculos.associate = function(models) {
        vehiculos.belongsTo(models.clientes);
        vehiculos.belongsTo(models.modelos);
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return vehiculos;
};
