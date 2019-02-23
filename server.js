const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const hbs = require('hbs')
const expressHandlebars = require('express-handlebars')
const compression = require('compression');
const passport = require('passport');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
})

//request urls.
const mainRoute = require("./routes/main");
const userRoute = require("./routes/user");
app.use(mainRoute);
app.use(userRoute);


app.listen(9000,()=>{
    console.log("Server listening at 9000");
});
