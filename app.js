const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const packageJson = require('./package.json');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDeploymentConfig = require('./webpack.development.config.js');

const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

const app = express();
const isDeveloping = process.env.NODE_ENV !== 'production';

app.disable('x-powered-by');

if (isDeveloping) {
    const compiler = webpack(webpackDeploymentConfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackDeploymentConfig.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make special data accessible to all views
app.use((req, res, next) => {
    res.locals.version = packageJson.version;
    next();
});

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        if (res.statusCode === 404) {
            res.render('not-found', {
                message: err.message,
                isFromDownloadRoute: err.isFromDownloadRoute || false
            });
        }
        else {
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);

    if (res.statusCode === 404) {
        res.render('not-found', {
            message: err.message,
            isFromDownloadRoute: err.isFromDownloadRoute || false
        });
    }
    else {
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});

module.exports = app;
