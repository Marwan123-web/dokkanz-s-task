const Category = require('../models//category');


class appService {

    static getAllCategories() {
        return Category.find()
    }

    static getOneCategory(categoryname) {
        return Category.findOne({ Name: categoryname })
    }

    static async addProductToCategory(categoryid, code, name, price) {
        var product = { code, name, price };
        return Category.findOne({ _id: categoryid }).updateOne(
            {}, // your query, usually match by _id
            { $push: { Products: product } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        );
    }

    static async deleteProductFromCategory(categoryid, productcode) {
        var product = { code: productcode };
        return Category.findOne({ _id: categoryid }).updateOne(
            {}, // your query, usually match by _id
            { $pull: { Products: product } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        );
    }

    static async updateCategoryProduct(categoryid, productid, code, name, price) {
        return Category.updateOne(
            { _id: categoryid, 'Products._id': productid },
            {
                $set: {
                    "Products.$.code": code,
                    "Products.$.name": name,
                    "Products.$.price": price
                }
            }
        )
    }

}

module.exports = appService;