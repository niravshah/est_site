var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var mongo_express = require('mongo-express/lib/middleware')
var mongo_express_config = require('./config')
var mongoose = require('mongoose');
var cons = require('consolidate')
var livereload = require('express-livereload')

var routes = require('./routes/index');
mongoose.connect('mongodb://localhost/est_site');
var app = express();


app.use('/mongo_express', mongo_express(mongo_express_config))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', cons.swig);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if(app.get('env') === 'development') {

    livereload(app, config={watchDir:process.cwd()+'/views'});

    app.use(function(err, req, res, next) {
        if(err.status == 404) {
            res.status(err.status);
            res.render('page-404');
        }
        if(err.status == 500) {
            res.status(err.status);
            res.render('page-500');
        } else {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    if(err.status == 404) {
        res.status(err.status);
        res.render('page-404');
    }
    if(err.status == 500) {
        res.status(err.status);
        res.render('page-500');
    } else {
        res.status(err.status || 500);
        console.log("ERROR", err);
        res.render('error', {
            message: err.message,
            status: err.status || 500,
            error: {}
        });
    }
});
app.listen(4000, function() {
    console.log('Started Node Server at 3000');
});
//module.exports = app;