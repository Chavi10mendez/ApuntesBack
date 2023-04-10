require('dotenv').config();  // npm i dotenv
const { Sequelize } = require('sequelize'); // npm i sequelize // npmi pg pg-hstore para usar postgres
const UserModel = require('./models/UserModel');
const PosteosModel = require('./models/PosteosModel');
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env;

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, 
  { logging: false });
//'postgres://user:pass@example.com:5432/dbname'

UserModel(database);
PosteosModel(database);

const { User, Posteo, } = database.models;

User.hasMany(Posteo, { through: 'UserPosteo' });
Posteo.belongsTo(User, { through: 'UserPosteo' });

 module.exports = { database, ...database.models }