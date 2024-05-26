const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data; 
  try {                                //includes: always an [key: array of object, {key: object because of ManytoMany}]
    const tagsName = await Tag.findAll({include: [{model: Product, through: ProductTag}]});
    res.json(tagsName)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {                                //includes: always an [key: array of object, {key: object because of ManytoMany}]
    const tagName = await Tag.findOne({where: {id: req.params.id},  include: [Product]});
    res.json(tagName)
  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try { //is it jumping the gun before the await? Apparently...
    console.log(req.body);
   const tag = await Tag.create(req.body);
    res.status(200).json(tag);//response of "tag" = good status rendered in JSON
  } catch(err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    updatedTag = await Tag.update(req.body, {where: {id: req.params.id}, include: [{model: Product, through: ProductTag}]});
    res.json(updatedTag);
  } catch(err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({where: {id: req.params.id}, include: [{model: Product, through: ProductTag}]})
    res.json(deleteTag)
  } catch(err) {
    res.json(err)
  }
});

module.exports = router;
