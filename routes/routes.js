const express = require('express');
const router = express.Router();
const appcontroller = require('../controllers/app-controller');

//------------------------Services-------------------


router.get('/viewcategories', appcontroller.getAllCategories);

router.get('/viewcategory/:categoryid', appcontroller.getOneCategory);

router.post('/addcategory', appcontroller.addNewCategory);

router.post('/addcategoryproduct/:categoryid', appcontroller.addCategoryProduct);

router.delete('/deletecategoryproduct/:categoryid/:productcode', appcontroller.deleteCategoryProduct);

router.put('/updatecategoryproduct/:categoryid/:productid', appcontroller.updateCategoryProduct);




module.exports = router;