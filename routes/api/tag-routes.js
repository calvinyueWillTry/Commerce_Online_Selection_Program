const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data; 
  try {                                //includes: always an [key: array of object, {key: object because of ManytoMany}]
    const tagName = await Tag.findAll({include: [{model: Product, through: ProductTag}]});
    res.json(tagName)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try { //is it jumping the gun before the await? Apparently
    console.log(req.body);
    await Tag.create(req.body);
    res.status(200);
  } catch(err) {
    res.json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
