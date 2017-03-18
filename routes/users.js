
module.exports = function(router, db){ //use db for db operations
    router.get('/', function (req, res, next) {
        res.send('respond with a resource');
    });
    return router;
};

