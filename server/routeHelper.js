const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "auth-simple",
  collectionName = "users";

function login(req, res) {
  console.log("/users/login accessed");

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);

    // --- expecting email,password
    const queryUser = req.body;

    dbo.collection(collectionName).findOne(queryUser, function(err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (user) {
        // --- this is post but nothing is created so return 200
        return res.status(200).send(user);
      }

      // -- not found
      return res.sendStatus(404);
    });
  });
}

function register(req, res) {
  console.log("/users/register accessed");

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(dbName);

    // --- expecting email,password,....
    const queryUser = req.body;
    console.log(queryUser);

    dbo
      .collection(collectionName)
      .findOne({ email: queryUser.email }, function(err, userFound) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }

        if (userFound) {
          // --- user exist by email
          return res.sendStatus(400);
        }

        // -- no email ---> insert
        dbo
          .collection(collectionName)
          .insertOne(queryUser, function(err, newUser) {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }

            return res.sendStatus(201);
          });
      });
  });
}

module.exports.login = login;
module.exports.register = register;
