var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    global.counters.findOne(
        { name: "front_page" },
        { _id: 0, count: 1 },
        function (err, doc) {
            res.render('index', {
                count: doc.count
            });
        }
    );
    counters.update(
        { name: "front_page" },
        { $inc: { count: 1 } },
        { w: 0 }
    );
});

module.exports = router;
