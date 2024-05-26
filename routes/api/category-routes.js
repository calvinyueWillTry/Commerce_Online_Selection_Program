const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //fetch typically fetches on the front end
  try { //all the categoires, and the products (child) within them
    const categoriesName = await Category.findAll({ include: [Product]}); //joins child product with category
    res.json(categoriesName)
  } catch (err) {
    res.json(err)
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try { //where {requests by the parameter of the id}
    const categoryName = await Category.findOne( {where: {id: req.params.id},  include: [Product]});
    res.json(categoryName)
  } catch (err) {
    res.json(err)
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try { 
    console.log(req.body)
    Category.create(req.body).then((newCategory)=> {
      res.status(200).json(newCategory)
    }).catch((err)=> {
      console.log(err)
    });//creates new category without calling the variable (POST got called)
  } catch(err) {
    res.json(err)
  }
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, { where: {id: req.params.id}, include: [Product]});
    res.json(updatedCategory);
  } catch(err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({where: {id: req.params.id}, include: [Product]});
    res.json(deleteCategory);
  } catch(err) {
    res.json(err)
  }
});

module.exports = router;
