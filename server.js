const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const hbs = require('hbs')
const expressHandlebars = require('express-handlebars')
const compression = require('compression');
const config = require('./config/secrets');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');


const app = express();

mongoose.connect(config.database, {useNewUrlParser: true},function(err){
    if(err) console.log(err);
    console.log("mongo connected")
})
mongoose.Promise = global.Promise;
const db = mongoose.connection;



app.engine(".hbs" , expressHandlebars({ defaultLayout : 'layout',extname : '.hbs' }));
app.set('view engine','hbs');
app.use(express.static(__dirname +"/public" ));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection : db, autoReconnect : true  })
}));
app.use(flash());
app.use(compression());
//request urls.
const mainRoute = require("./routes/main");
app.use("/",mainRoute);


app.listen(9000,()=>{
    console.log("Server listening at 9000");
});
