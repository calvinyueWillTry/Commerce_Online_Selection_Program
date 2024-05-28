const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//how does this work?
router.get('/', async (req, res) => { //route set up
  // find all tags
  // be sure to include its associated Product data; 
  try { //await returns a promsie from Tag.findAll();
    //includes: always an [key: array of object, {key: object because of ManytoMany}]
    const tagsName = await Tag.findAll({include: [{model: Product, through: ProductTag}]});
    //"include" specify that you want to include associated Product data for each tag
    res.json(tagsName) //JSON object containing the tags and their associated products
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => { //expects a parameter in the URL representing the tag's id#
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {// find a single tag by its ID from the Tag model;
    //includes: always a [key: {array of object find a tag with the ID provided in the request parameters}, 
    //{key: object that includes associated Product data for the tag because of ManytoMany}]
    const tagName = await Tag.findOne({where: {id: req.params.id},  include: [Product]});
    res.json(tagName)
  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try { //It jumped the gun before the await, apparently because it needs json(variable)
  //console.log(req.body);
   const tag = await Tag.create(req.body);//create the tag first (the request needs a body to POST in) before sending a response back
    res.status(200).json(tag);//response of the new "tag" = good status rendered as a JSON object
  } catch(err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => { //:id is a placeholder for the tag's ID that allows one to access the id value from req.params.id.
  // update a tag's name by its `id` value
  try{ //update(1st argv, which contains the updated info for the tag, {2nd argv "where": condition to match the tag's id with {req.params.id} include the Product model with the ProductTag association})
    updatedTag = await Tag.update(req.body, {where: {id: req.params.id}, include: [{model: Product, through: ProductTag}]});
    res.json(updatedTag);
  } catch(err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {//id is the parameter passed in the request
  // delete on tag by its `id` value
  try { //{delete the tag with the matching id from the req.params.id}, include: the Product model through the ProductTag association
    const deleteTag = await Tag.destroy({where: {id: req.params.id}, include: [{model: Product, through: ProductTag}]});
    res.json(deleteTag);//response sends back a JSON object containing info about the deleted tag
  } catch(err) {
    res.json(err)
  }
});

module.exports = router;
