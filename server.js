const express = require('express');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
const methodOverride = require('method-override');
const config = require('./config/config');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: false
}));
app.use(session({
    secret: "artistscard-secret",
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(config.sessionMysql)
}));
app.use('/', require('./routes'));

app.listen(port, () => console.log(`start server & port = ${port}!`));

