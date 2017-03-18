module.exports = function(router, db){ //use db for db operations
    router.get('/recipient', function (req, res, next) {
        res.render('recipient', { title: 'Search for a donor' });
    });
    return router;
};
