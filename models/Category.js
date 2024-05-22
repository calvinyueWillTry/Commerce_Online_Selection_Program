const { Model, DataTypes } = require('sequelize');
//pulling default template to create { Model, DataTypes } from const sequelize, redirecting to connection.js
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  { //1st object defines the table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_id: { //haveMany
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {model: "product"} //from Product.js
  }
},
  {//2nd object defines the parameters for the table:
    sequelize,//see line 2
    timestamps: false,
    freezeTableName: true,//don't pluralize name from 'dish' to 'dishes'
    underscored: true,//display with underscores
    modelName: 'category',//keyword to export this table
  }
);

module.exports = Category;
