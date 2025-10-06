import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      hashed_password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: true,
      tableName: 'users'
    }
  );

  return User;
};