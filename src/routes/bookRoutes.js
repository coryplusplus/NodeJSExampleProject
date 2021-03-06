var express = require("express");
var mongodb = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
var bookRouter = express.Router();
var router = function (nav) {
var url =
        "mongodb://localhost:27017/libraryApp";


    bookRouter.route("/")
        .get(function (req, resp) {


            mongodb.connect(url, function (err, db) {

                var collection = db.collection("books");
                collection.find({}).toArray(
                    function (err, results) {
                        resp.render("bookListView", {
                            title: "Books",
                            nav: nav,
                            books: results
                        });
                    }
                );


            });


        });

    bookRouter.route("/:id")
        .get(function (req, resp) {

            var id = new objectId(req.params.id);
            mongodb.connect(url, function (err, db) {

                var collection = db.collection("books");
                collection.findOne({
                        _id: id
                    },
                    function (err, results) {
                        resp.render("bookView", {
                            title: "Books",
                            nav: nav,
                            book: results
                        });
                    }
                );


            });



        });

    return bookRouter;

}
module.exports = router;