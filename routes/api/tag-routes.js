const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
     }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
     });

     if (!allTags) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
     }
      
     res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(function(newTag) {
    res.json(newTag);
  })
   .catch(function(err) {
     res.json(err)
   });
//   .catch((err)=> {
//     res.json(err);
// })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
    tag_name: req.body.tag_name
     },
     {
       where: {
         id: req.params.id
       }
     }  
    )
    .then(function(newTag) {
      if(!newTag) {
        res.status(404).json({message: "Not found"});
        return;
      }
      res.json(newTag);
    })
    .catch(function(err) {
      res.jason(err)
    })
    
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(function(newTag) {
      if(!newTag) {
        res.status(404).json({message: "Not found"});
        return;
      }
      res.json(newTag)({message: "you have successfully deleted"});
    })
    .catch(function(err) {
      res.jason(err)
    })
});

module.exports = router;
