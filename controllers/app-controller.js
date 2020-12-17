const appService = require('../service//app-service');
const Category = require('../models//category');

exports.getAllCategories = async (req, res, next) => { //[]
    appService.getAllCategories().then((data) => {
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ msg: 'Your Data Not Found' });
        }
    }).catch(err => {
        res.status(500).json({ msg: 'Internal Server Error' });
    })
}//done

exports.addNewCategory = async (req, res, next) => { //[]
    try {
        const { CategoryName } = req.body
        const checkName = await Category.findOne({ CategoryName });
        if (checkName) {
            res.status(400).json({ msg: 'This Name Of Category Has Been Added Before' });
        } else {
            const newCategory = new Category({ CategoryName });
            await newCategory.save();
            res.status(200).json({ msg: 'Category Added Successfuly' });
        }
    } catch (error) {
        next(error)
    }
}//done


exports.getOneCategory = async (req, res, next) => { //[]
    let categoryname = req.params.categoryname;
    appService.getOneCategory(categoryname).then((data) => {
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ msg: 'Your Data Not Found' });
        }
    }).catch(err => {
        res.status(500).json({ msg: 'Internal Server Error' });
    })
}//done

exports.addNewSubCategory = async (req, res, next) => { //[]
    try {
        const { CategoryName, SubCategoryName } = req.body
        const checkName = await Category.findOne({ CategoryName, 'SubCategories.Name': SubCategoryName });
        if (checkName) {
            res.status(400).json({ msg: 'This Name Of Sub Category Has Been Added Before' });
        } else {
            appService.addNewSubCategory(CategoryName, SubCategoryName).then((subCategory) => {
                if (subCategory) {
                    res.json({ msg: 'Sub-Category Added Successfuly' });
                } else {
                    res.status(404).json({ msg: 'Something Was Wrong' });
                }
            }).catch(err => {
                res.status(500).json({ msg: 'Internal Server Error' });
            })
        }
    } catch (error) {
        next(error)
    }//done
}

exports.addSubCategoryProduct = async (req, res, next) => {
    let categoryname = req.params.categoryname;
    let subcategoryname = req.params.subcategoryname;

    const { code, name, price } = req.body
    let checkforProductCode = await Category.findOne({
        CategoryName: categoryname, 'SubCategories.Name': subcategoryname, 'SubCategories.Products.code': code
    }, {});
    if (checkforProductCode != null) {
        return res.status(400).json({
            icon: '&#xE5CD;',
            style: 'error',
            msg: "This Product Code Was Added Before"
        });
    }
    else {
        appService.addProductToSubCategory(categoryname, subcategoryname, code, name, price).then((product) => {
            if (product) {
                res.json({ msg: 'Product Added Successfuly' });
            } else {
                res.status(404).json({ msg: 'Something Was Wrong' });
            }
        }).catch(err => {
            res.status(500).json({ msg: 'Internal Server Error' });
        })
    }

}

exports.deleteSubCategoryProduct = async (req, res, next) => { //[]
    let categoryname = req.params.categoryname;
    let subcategoryname = req.params.subcategoryname;
    let productcode = req.params.productcode;
    appService.deleteProductFromSubCategory(categoryname, subcategoryname, productcode).then((product) => {
        if (product) {
            res.json({ msg: 'Product Deleted Successfuly' });
        } else {
            res.status(404).json({ msg: 'Something Was Wrong' });
        }
    }).catch(err => {
        res.status(500).json({ msg: 'Internal Server Error' });
    })

}

exports.updateSubCategoryProduct = async (req, res, next) => { //[]
    let categoryname = req.params.categoryname;
    let subcategoryname = req.params.subcategoryname;
    let productid = req.params.productid;
    const { name, price } = req.body
    appService.updateSubCategoryProduct(categoryname, subcategoryname, productid, name, price).then((product) => {
        if (product) {
            res.json({ msg: 'Product Updated Successfuly' });
        } else {
            res.status(404).json({ msg: 'Something Was Wrong' });
        }
    }).catch(err => {
        res.status(500).json({ msg: 'Internal Server Error' });
    })

}