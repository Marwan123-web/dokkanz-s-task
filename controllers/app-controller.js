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
}

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
}

exports.addNewCategory = async (req, res, next) => { //[]
    try {
        const { Name, Description } = req.body
        const checkName = await Category.findOne({ Name });
        if (checkName) {
            res.status(400).json({ msg: 'This Name Of Category Has Been Added Before' });
        } else {
            const newCategory = new Category({ Name, Description });
            await newCategory.save();
            res.status(200).json({ msg: 'Category Added Successfuly' });
        }
    } catch (error) {
        next(error)
    }
}

exports.addCategoryProduct = async (req, res, next) => {
    let categoryid = req.params.categoryid;
    const { code, name, price } = req.body
    let checkforProductCode = await Category.findOne({
        _id: categoryid,
    }, { Products: { $elemMatch: { code } } });
    if (checkforProductCode.Products.length > 0) {
        return res.status(400).json({
            icon: '&#xE5CD;',
            style: 'error',
            msg: "This Product Code Was Added Before"
        });
    }
    else {
        appService.addProductToCategory(categoryid, code, name, price).then((product) => {
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

exports.deleteCategoryProduct = async (req, res, next) => { //[]
    let categoryid = req.params.categoryid;
    let productcode = req.params.productcode;
    appService.deleteProductFromCategory(categoryid, productcode).then((product) => {
        if (product) {
            res.json({ msg: 'Product Deleted Successfuly' });
        } else {
            res.status(404).json({ msg: 'Something Was Wrong' });
        }
    }).catch(err => {
        res.status(500).json({ msg: 'Internal Server Error' });
    })

}

exports.updateCategoryProduct = async (req, res, next) => { //[]
    let categoryid = req.params.categoryid;
    let productid = req.params.productid;
    const { code, name, price } = req.body
    let checkforProductCode = await Category.findOne({
        _id: categoryid,
    }, { Products: { $elemMatch: { code } } });
    if (checkforProductCode.Products.length > 0 && checkforProductCode.Products[0]._id != productid) {
        return res.status(400).json({
            icon: '&#xE5CD;',
            style: 'error',
            msg: "This Product Code Was Used Before"
        });
    }
    else {
        appService.updateCategoryProduct(categoryid, productid, code, name, price).then((product) => {
            if (product) {
                res.json({ msg: 'Product Updated Successfuly' });
            } else {
                res.status(404).json({ msg: 'Something Was Wrong' });
            }
        }).catch(err => {
            res.status(500).json({ msg: 'Internal Server Error' });
        })
    }


}