'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todoly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      
      // define association here
    }
  };
  todoly.init({
    todo_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    updatedAt: false,
    createdAt: false,
    tableName: 'todoly',
    modelName: 'todoly',
  });
  return todoly;
};