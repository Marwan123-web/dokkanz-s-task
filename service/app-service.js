const Category = require('../models//category');


class appService {

    static getAllCategories() {
        return Category.find()
    }

    static getOneCategory(categoryname) {
        return Category.findOne({ Name: categoryname })
    }

    static async addProductToCategory(categoryname, code, name, price) {
        var product = { code, name, price };
        return Category.findOne({ Name: categoryname }).updateOne(
            {}, // your query, usually match by _id
            { $push: { Products: product } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        );
    }

    static async deleteProductFromCategory(categoryname, productcode) {
        var product = { code: productcode };
        return Category.findOne({ Name: categoryname }).updateOne(
            {}, // your query, usually match by _id
            { $pull: { Products: product } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        );
    }

    static async updateCategoryProduct(categoryname, productid, code, name, price) {
        return Category.updateOne(
            { Name: categoryname, 'Products._id': productid },
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