import { configDotenv } from "dotenv";
import app from "./app.js";
import db, { sequelize } from "./db/index.js";

// Load environment variables
configDotenv();

const port = process.env.PORT || 4000;

// Start server and sync database
const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        // Sync database models with database (create tables if they don't exist)
        // Using alter:true to make any necessary changes to match the model
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');
        
        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or sync models:', error);
        process.exit(1);
    }
};

// Run the server
startServer();