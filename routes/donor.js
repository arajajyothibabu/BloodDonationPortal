module.exports = function(router, db){ //use db for db operations
    router.get('/', function (req, res, next) {
        res.render('donor', { title: ' donor registration' });
    });
    return router;
};



