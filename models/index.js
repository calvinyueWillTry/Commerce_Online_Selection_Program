// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  //not the same foreignKey as in the model, because that is an object, that needs to be synched up here
  foreignKey: "category_id"
})
// Categories have many Products
Category.hasMany(Product,{
  foreignKey: "category_id"
})
// Products belongToMany Tags (relationship through the ProductTag)
Product.belongsToMany(Tag,{
  through: ProductTag,
  foreignKey: "product_id"
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  through: ProductTag,
  foreignKey: "tag_id"
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
