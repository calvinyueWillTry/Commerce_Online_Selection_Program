const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
      tag_name: { //# and letters
        type: DataTypes.STRING,
          allowNull: false,
    },
      product_id: { //hasOne
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {model: "product"} //from Product.js
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
