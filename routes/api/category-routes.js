const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const findAllCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(findAllCategories);
     }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findAllCategories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
     });

     if (!findAllCategories) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
     }
      
     res.status(200).json(findAllCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(function(newCategory) {
      res.json(newCategory);
  })
  .catch(function(err) {
       res.json(err);
  })
//   .catch((err)=> {
//     res.json(err);
// })

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
    category_name: req.body.category_name
     },
     {
       where: {
         id: req.params.id
       }
     }  
    )
    .then(function(newCategory) {
      if(!newCategory) {
        res.status(404).json({message: "Not found"});
        return;
      }
      res.json(newCategory);
    })
    .catch(function(err) {
      res.jason(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(function(categoryData) {
      if(!categoryData) {
        res.status(404).json({message: "Not found"});
        return;
      }
      res.json(categoryData);
    })
    .catch(function(err) {
      res.jason(err)
    })
});

module.exports = router;
