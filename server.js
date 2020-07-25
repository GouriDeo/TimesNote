var express = require('express')
var bodyParser = require('body-parser')
require('dotenv').config();
const port = process.env.PORT
const app = express();
const database = require('./config/config.database')
const userRoutes = require('./app/routes/user.routes')
const noteRoutes = require('./app/routes/note.routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/user',userRoutes)
app.use('/note',noteRoutes)

database.mongoose;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
}); 
