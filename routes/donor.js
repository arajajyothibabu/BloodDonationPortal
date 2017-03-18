module.exports = function(router, db){ //use db for db operations
    router.get('/donor', function (req, res, next) {
        res.render('donor', { title: ' donor registration' });
    });
    return router;
};



