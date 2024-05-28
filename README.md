It starts with SQL, and creating the database ecommerce_db; in schema.sql to run it.
<img width="1280" alt="Screen Shot 2024-05-27 at 10 49 21 PM" src="https://github.com/calvinyueWillTry/Commerce_Online_Selection_Program/assets/158237430/9705ea3c-9ce6-4245-8b80-5abf8d9d4384">
See the video for how I wrote the models and routes
https://drive.google.com/file/d/1lU4nkYEBARqHX6Bqagcg8baz6u-iQ8t4/view?usp=sharing
ALl the models for the 2nd object, utilize the connection.js file through the variable "sequelize," no timestamps, freezeTableName to avoid adding plurals to names, underscored to replace spaces with "_", and the modelName: "in string format".
For the 1st object, all have the id (which is type: DataTypes.INTEGER, can't be null, the primaryKey and autoincremented), and the (fill)_name (which has type: DataTypes.STRING, and can't be null).
For the model ProductTag.js, it's disctinct in that it establishes both tag_id and product_id as foreignKeys. This allows these two models to be set up to have a correlating relationship.
In the model folder index.js the following relationships are established:
Product.belongsTo(Category, {foreignKey: "category_id"}), Category.hasMany(Product,{foreignKey: "category_id"}), Product.belongsToMany(Tag,{through: ProductTag,foreignKey: "product_id"}), Tag.belongsToMany(Product,{through: ProductTag,foreignKey: "tag_id"}).
The url includes the port, /api, then whatever is being sought for changed (/categories, /products, /tags).
In all the GET routes, the findAll or findOne functions all include the foreignKey, e.g. Products under Category. If it's findOne, it only applies to the id that's requested in the url as the parameter.
For POST routes, the information to be posted need to be created in req.body, then rendered in json format. In the case of Product, since tags are associated with it, one must also map and bulkCreate the tags associated with the Product.
for PUT routes, it takes the new req.body, then finds the id that it's going to replace the current information in, then finds everything there, and then filters through the existing related information (e.g. tags_id under Products), keeping ones that are the same, but eliminating ones that aren't included in the new one.
For DELETE routes, it destroy everything at the id specified ({id: req.params.id}), including the related information within.
