const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //fetch typically fetches on the front end
  
  try { //all the categoires, and the products within them
    const categoryName = await Category.findAll({ include: [Product]});
    res.json(categoryName)
  } catch (err) {
    res.json(err)
  };
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  
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

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  fetch(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({category_name}),
    headers: { 'Content-Type': 'application/json' },
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  fetch(`/api/categories/${id}`, {
    method: "DELETE", 
    body: JSON.stringify({category_name}),
    headers: { 'Content-Type': 'application/json' },
  })
});

module.exports = router;
