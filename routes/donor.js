var donorCollection = "donors";

module.exports = function(router, db){ //use db for db operations
    router.post('/donor', function (req, res, next) {
        console.log(req.body);
        db.collection(donorCollection).insertOne(Object.assign(req.body, {date: new Date()}), function (err, response) {
            var isInserted = false;
            if(response){
                isInserted = true;
            }
            res.json(isInserted);
        });
    });
    return router;
};



