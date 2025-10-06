import { Sequelize } from "sequelize";
import userModel from "../models/user.model.js";
import todoModel from "../models/todo.model.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database configuration
const DB_NAME = process.env.DB_NAME || "todo";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "rootpass";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Initialize models
const db = {
    sequelize,
    Sequelize,
    User: userModel(sequelize),
    Todo: todoModel(sequelize)
};

// Define associations
db.User.hasMany(db.Todo, { foreignKey: 'userId' });
db.Todo.belongsTo(db.User, { foreignKey: 'userId' });

export default db;
export { sequelize };
