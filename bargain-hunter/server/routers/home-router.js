'use strict';

module.exports = function(app, express) {
    let router = express.Router();

    router.get('/', function(req, res) {
        console.log('Called Home route');
        console.log(`---req user----${req.user}`);
        res.render('home');
    });

    router.get('/Home', function(req, res) {
        res.redirect('/');
    });
    
    app.use(router);
};