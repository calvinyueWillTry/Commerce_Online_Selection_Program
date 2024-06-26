const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class ProductTag extends Model {}

ProductTag.init(
  {
    id: { //which tag belongs to which product
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //reference to control 2 relationships because manytomany
    //this baby model has 2 parents
    tag_id: { 
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {model: "tag", key: "id"} //from Tag.js
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "product", key: "id"} //from Product.js
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
