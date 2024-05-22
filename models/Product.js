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
        type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true, 
    },
    product_name: {
        type: DataTypes.STRING,//VARCHAR?
          allowNull: false,
    },
    product_price: {
      type: DataTypes.DECIMAL,
        allowNull: true,
        validate: { isDecimal: true } 
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: { isNumeric: true }
    },
    category_id: { //hasOne
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {model: "category"} //from Category.js
    }
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
