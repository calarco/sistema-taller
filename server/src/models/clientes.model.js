// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
    const sequelizeClient = app.get("sequelizeClient");
    const clientes = sequelizeClient.define(
        "clientes",
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            apellido: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                defaultValue: ""
            },
            direccion: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            empresa: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
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
    clientes.associate = function(models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return clientes;
};
