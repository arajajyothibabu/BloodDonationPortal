module.exports = function(router, db){ //use db for db operations
    router.post('/donors', function (req, res, next) {
        console.log(req.body);
        res.json({performance: {total: 10000, fetched: 500, time: 2}, donors: []});
    });
    return router;
};
