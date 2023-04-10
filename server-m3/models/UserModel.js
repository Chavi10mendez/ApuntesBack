const { DataTypes } = require('sequelize');


module.exports = (database) => {

    //primer modelo de tabla o entidad

    database.define('User', {

        //atributo, primary key 
        id: {
            // constreings
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min: 3,
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                min: 3,
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.INTEGER,
            allowNull:true,
            unique: true,
            
        }
    },
    {
        timestamps: false
    });
}