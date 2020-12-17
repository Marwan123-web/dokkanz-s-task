const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    CategoryName: { type: String },
    SubCategories: [
        {
            Name: { type: String },
            Products: [
                {
                    code: { type: String },
                    name: { type: String },
                    price: { type: Number },

                }
            ]
        }
    ],

    // Name Description Products[{code, name, price}] 
});


module.exports = mongoose.model('category', categorySchema);