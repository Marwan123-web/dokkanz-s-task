const Category = require('../models//category');


class appService {

    static getAllCategories() {
        return Category.find()
    }

    static getOneCategory(categoryname) {
        return Category.findOne({ CategoryName: categoryname })
    }//done

    static addNewSubCategory(CategoryName, SubCategoryName) {
        var SubCategory = { Name: SubCategoryName };
        return Category.findOne({ CategoryName }).updateOne(
            {}, // your query, usually match by _id
            { $push: { SubCategories: SubCategory } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        );
    }

    static async addProductToSubCategory(categoryname, subcategoryname, code, name, price) {
        var product = { code, name, price };
        return Category.findOne({ CategoryName: categoryname, 'SubCategories.Name': subcategoryname }).updateOne(
            {}, // your query, usually match by _id
            { $push: { "SubCategories.$.Products": product } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        );
    }

    static async deleteProductFromSubCategory(categoryname, subcategoryname, productcode) {
        var product = { code: productcode };
        return Category.findOne({ CategoryName: categoryname, 'SubCategories.Name': subcategoryname }).updateOne(
            {}, // your query, usually match by _id
            { $pull: { "SubCategories.$.Products": product } }, // item(s) to match from array you want to pull/remove
            { multi: true } // set this to true if you want to remove multiple elements.
        );
    }

    static async updateSubCategoryProduct(categoryname, subcategoryname, productid, name, price) {
        return Category.updateOne(
            { CategoryName: categoryname, 'SubCategories.Name': subcategoryname, 'SubCategories.Products._id': productid },
            {
                $set: {
                    "SubCategories.0.Products.$.name": name,
                    "SubCategories.0.Products.$.price": price
                }
            }
        )
    }

}

module.exports = appService;