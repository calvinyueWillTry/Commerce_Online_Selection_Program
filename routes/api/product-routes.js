const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
//what does this do?
// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try { //include: what category_id, { and Tag by checking ProductTag (this is the only one to find Tag) }
    const productName = await Product.findAll({include: [Category, {model: Tag, through: ProductTag}]});
    res.json(productName)
  } catch (error) {
    res.json(error)
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{//In Product model, fineOne(based on id in url, includes [{object array of the model Tag, through its relationship to Product stated in ProductTag}])
    const productName = await Product.findOne({where: {id: req.params.id}, include: [{model: Tag, through: ProductTag}]});
    res.json(productName)
  } catch (err) {
    res.json(err)
  };
});

// create new product
router.post('/', (req, res) => { //optional "/" at the end?
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body) //req.body object should contain the following info to create a product: product_name, price, stock & tagIds.
    .then((product) => { //req.body contains tagIds, it means that the product has associated tags
      if (req.body.tagIds.length) {// because of the product tags, we need to create pairings to bulk create in the ProductTag model
        const productTagIdArr = req.body.tagIds.map((tag_id) => {//map the tagIds within the body of the request, with the tag_id as a parameter
          return { //render the following within
            product_id: product.id, tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      } //create multiple entries in the ProductTag model to associate the product with the tags
      // respond back with the new product being rendered. 
      res.status(200).json(product);
    })//If there are no tagIds in the request body, the product is created without any tags, only the product details are sent in the response. 
    //If there are tags, the response includes the productTagIds after bulk creation
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, { //update the specific id with the new request body entered.
    where: {id: req.params.id,},
  })
    .then((product) => {//if there are tagIds && not 0 of them,
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({ //fetches all existing ProductTag entries related to the product with the given id
          where: { product_id: req.params.id }
        }).then((productTags) => {// filters out the existing tag_ids,  
          const productTagIds = productTags.map(({ tag_id }) => tag_id);//create filtered list of new tag_ids,
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))//add or remove the tagIds
          .map((tag_id) => {
            return { //renders the new set of tags
              product_id: req.params.id,
              tag_id,};
          });
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))//filter out the tagIds that don't apply based on their ids
          .map(({ id }) => id); //map out which ids to find
                  // Promise.all() runs both actions
          return Promise.all([ //deleting the ProductTag entries that need to be removed
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),//bulk-create new ProductTag entries for the produc
          ]);
        });
      }
      return res.json(product);//renders all of it
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {//destroy only the id based on the params requested from the id of the url, also delete [{object array of Tags from the model that are related to Product through ProductTag}]
    const deleteProduct = await Product.destroy({where: {id: req.params.id}, include: [{model: Tag, through: ProductTag}]});
    res.json(deleteProduct)
  } catch(err) {
    res.json(err)
  }
});

module.exports = router;
