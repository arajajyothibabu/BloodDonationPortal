var bloodGroupsCompatibilityMap = require('./utils').bloodGroupsCompatibilityMap;

var donorCollection = "donors";
module.exports = function(router, db){ //use db for db operations
    router.post('/donors', function (req, res, next) {
        var body = req.body;
        //console.log(body);
        var query = {
            "location": {
                $near: body.location,
                $maxDistance: body.radius / 111.12 //KM into radians
            },
            group: {'$in': bloodGroupsCompatibilityMap[body.group]} //checking for compatible groups
        };
        //console.log(query);
        var cursor = db.collection(donorCollection).find(query);
        var performanceCursor = db.collection(donorCollection).find(query); //FIXME: get both result and performance from single query
        cursor.toArray(function (err, response) {
            var donors = [];
            if(response){
                donors = response;
            }
            console.log("Response Donors -> ", donors);
            performanceCursor.explain(function (error, explanation) {
                if(explanation){
                    var performance = explanation.executionStats;
                    res.json({performance: {total: performance.totalDocsExamined, fetched: performance.nReturned, time: performance.executionTimeMillis / 1000}, donors: donors});
                }
                if(error){
                    res.json({performance: {total: "NA", fetched: "NA", time: "NA"}, donors: donors});
                }
            });
        })
    });
    return router;
};
