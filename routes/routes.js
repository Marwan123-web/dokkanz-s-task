const express = require('express');
const router = express.Router();
const appcontroller = require('../controllers/app-controller');

//------------------------Services-------------------


router.get('/viewcategories', appcontroller.getAllCategories);

router.get('/viewcategory/:categoryname', appcontroller.getOneCategory);

router.post('/addcategory', appcontroller.addNewCategory);

router.post('/addsubcategory', appcontroller.addNewSubCategory);


router.post('/addsubcategoryproduct/:categoryname/:subcategoryname', appcontroller.addSubCategoryProduct);

router.delete('/deletesubcategoryproduct/:categoryname/:subcategoryname/:productcode', appcontroller.deleteSubCategoryProduct);

router.put('/updatesubcategoryproduct/:categoryname/:subcategoryname/:productid', appcontroller.updateSubCategoryProduct);




module.exports = router;