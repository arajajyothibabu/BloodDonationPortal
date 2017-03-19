module.exports = function(router, db){ //use db for db operations
    router.post('/donor', function (req, res, next) {

        console.log(req.body);
        res.json(true);
    });
    return router;
};



