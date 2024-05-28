const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//what does this do?
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //fetch typically fetches on the front end
  try { //all the categoires, and the products (child) within them
    //await returns a promsie from Category.findAll();
    //includes: always an [{key: array of class object}]
    const categoriesName = await Category.findAll({ include: [Product]}); //joins child product with category
    res.json(categoriesName);//JSON object containing the categories and their associated products/tags
  } catch (err) {
    res.json(err)
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // find a single tag by its ID from the Category model;
  try { //where {requests by the parameter of the id}, includes the associated Product data for the Category because of onetoMany
    const categoryName = await Category.findOne( {where: {id: req.params.id},  include: [Product]});
    res.json(categoryName);
  } catch (err) {
    res.json(err)
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try { 
  //create(create a new category with the "data for the new category" stored in req.body).
  //then(turn req.body in newCategory)=>{response is a success status, then turn data into JSON object }
    Category.create(req.body).then((newCategory)=> {
      res.status(200).json(newCategory)
    }).catch((err)=> {//check to make sure that there's no errors
      console.log(err)
    });//creates new category without calling the variable (POST got called)
  } catch(err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try { //req.body contains the new piece of info, it reaplaces that info at {where: the id in the url matches the id found in the params as a req}, includes the [Product array within that Category] 
    const updatedCategory = await Category.update(req.body, { where: {id: req.params.id}, include: [Product]});
    res.json(updatedCategory);
  } catch(err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {//find the Category where: {the id matches the id in the url where the parameters meet the request}, includes the [Product array within]
    const deleteCategory = await Category.destroy({where: {id: req.params.id}, include: [Product]});
    res.json(deleteCategory);//response to render the delete in the JSON format that it was rendered in
  } catch(err) {
    res.json(err)
  }
});

module.exports = router;
