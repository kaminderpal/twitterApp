const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const hbs = require('hbs')
const expressHandlebars = require('express-handlebars')


const app = express();

app.engine(".hbs" , expressHandlebars({ defaultLayout : 'layout',extname : '.hbs' }));
app.set('view engine','hbs');
app.use(express.static(__dirname +"/public" ));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//request urls.
const mainRoute = require("./routes/main");
app.use("/",mainRoute);


app.listen(9000,()=>{
    console.log("Server listening at 9000");
});
