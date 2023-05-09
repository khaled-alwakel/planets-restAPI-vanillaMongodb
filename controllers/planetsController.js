let uri =
  "mongodb+srv://Khaled-Alwakel:rTZfq8uZiiJmQw0e@cluster0.g1hid9r.mongodb.net/sample_guides?retryWrites=true&w=majority";

const { MongoClient } = require("mongodb");
const client = new MongoClient(uri);

exports.checkID = (req, res, next, value) => {
  console.log(`planet id is : ${value}`);
  //todo check if id exist or no
  // if () {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "Invalid Id ",
  //   });
  // }
  next();
};

// middleware for check the request body
exports.checkBody = (req, res, next) => {
  if (!req.body.Name || !req.body.orderFromSun) {
    return res.status(400).json({
      status: "fail",
      message: "missing name or order from sun!",
    });
  }
  next(); // next is create planet
};

// get all planet according to order from sun :)
exports.getAllPlanets = async (req, res) => {
  try {
    await client.connect();
    const cursor = client
      .db("sample_guides")
      .collection("planets")
      .find({})
      .sort({ orderFromSun: 1 });
    const planets = await cursor.toArray();
    if (planets) {
      res.status(200).json({
        requestedAt: req.requestTime,
        status: "success",
        results: planets.length,
        data: { planets },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  } finally {
    await client.close();
  }
};

exports.getPlanet = (req, res) => {
  //TODO
};

exports.createPlanet = (req, res) => {
  //TODO
};

exports.updatePlanet = (req, res) => {
  //TODO
};

exports.deletePlanet = (req, res) => {
  //TODO
};
