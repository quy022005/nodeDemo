const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const morgan = require('morgan');
const app = express();
const port = 3000;
const route = require('./routes/index');
const db = require('./config/db')
// Connect to DB
db.connect();
app.use(express.static(path.join(__dirname, 'public')));
// midleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));
// HTTP logger
app.use(morgan('combined'));
// custom middlewares
app.use(SortMiddleware);
// template engine
app.engine('handlebars', handlebars.engine({
    helpers: require('./helpers/handlebars'),
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));
// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
