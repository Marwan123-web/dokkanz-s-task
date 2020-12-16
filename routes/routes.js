const express = require('express');
const router = express.Router();
const appcontroller = require('../controllers/app-controller');

//------------------------Services-------------------


router.get('/viewcategories', appcontroller.getAllCategories);

router.get('/viewcategory/:categoryname', appcontroller.getOneCategory);

router.post('/addcategory', appcontroller.addNewCategory);

router.post('/addcategoryproduct/:categoryname', appcontroller.addCategoryProduct);

router.delete('/deletecategoryproduct/:categoryname/:productcode', appcontroller.deleteCategoryProduct);

router.put('/updatecategoryproduct/:categoryname/:productid', appcontroller.updateCategoryProduct);




module.exports = router;