// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.Integer,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productName:{
      type: DataTypes.String,
      allowNull: false,
    },
    price: {
      type: DataType.Decimal,
      allowNull: false,
      validate:{
        isDecimal: true,
      },
    },
    stock: {
      Type: DataTypes.Integer,
      allowNull: false,
      defaultValue: 10,
      validate:{
        isNumeric: true,
      },
    },
    categoryId: {
      type: DataTypes.Integer,
      reference: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
