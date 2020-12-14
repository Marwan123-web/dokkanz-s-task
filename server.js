const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const routes = require('./routes/routes');
require('./database.js');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log('Server is listening on Port:', PORT);
})