var bloodGroupsCompatibilityMap = require('./utils').bloodGroupsCompatibilityMap;

var donorCollection = "donors";
module.exports = function(router, db){ //use db for db operations
    router.post('/donors', function (req, res, next) {
        var body = req.body;
        console.log(body);
        var query = {
            "location": {
                $near: body.location,
                $maxDistance: body.radius / 111.12 //KM into radians
            },
            group: {'$in': bloodGroupsCompatibilityMap[body.group]} //checking for compatible groups
        };
        console.log(query);
        db.collection(donorCollection).find(query).toArray(function (err, response) {
            var donors = [];
            if(response){
                donors = response;
            }
            console.log("Response Donors -> ", donors);
            //TODO: query performance
            res.json({performance: {total: 10000, fetched: 500, time: 2}, donors: donors});
        });
    });
    return router;
};
