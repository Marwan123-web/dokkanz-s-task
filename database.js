var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/Dokkanz's-Task-Database", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log("Your DB (Dokkanz's-Task-Database) Connected");
// });

mongoose.connect("mongodb+srv://marawansalman:maromaro1212@dokkanz-task-database.9juht.mongodb.net/Dokkanz's-Task-Database", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Your DB (Dokkanz's-Task-Database) Connected");
});

// mongodb+srv://marawansalman:<password>@dokkanz-task-database.9juht.mongodb.net/test