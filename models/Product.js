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
    price: {
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
    //This is the child model that receives id from the parent below
    category_id: { //OnetoMany(products) index.js line 8
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {model: "category", key: "id"} //foreign, then key from Category.js
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
