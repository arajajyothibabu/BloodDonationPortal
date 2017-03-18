module.exports = function(router, db){ //use db for db operations
    router.get('/', function (req, res, next) {
        res.render('recepient', { title: 'Search for a donor' });
    });
    return router;
};
