const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/planets");

const dbName = "planets";
const db = client.db(dbName);
const collection = db.collection("planets");

exports.checkID = async (req, res, next, value) => {
  try {
    await client.connect();
    const result = await collection.findOne({
      _id: new ObjectId(value),
    });
    if (result) next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "invalid id",
    });
  }
};
// exports.checkBody = async (req, res, next) => {
//   if (!req.body.planetName || !req.body.orderFromSun) {
//     return res.status(400).json({
//       status: "failed",
//       message: "missing planetName or orderFromSun",
//     });
//   } else {
//     next();
//   }
// };
// get all planet according to order from sun :)
exports.getAllPlanets = async (req, res) => {
  try {
    await client.connect();
    const planets = await collection.find().toArray();
    res.status(200).json({
      requestedAt: req.requestTime,
      status: "success",
      results: planets.length,
      data: { planets },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPlanet = async (req, res) => {
  try {
    await client.connect();

    const planet = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json({
      requestedAt: req.requestTime,
      status: "success",
      data: { planet },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createPlanet = async (req, res) => {
  try {
    await client.connect();

    const newPlanet = req.body;
    const result = await collection.findOne(newPlanet);
    if (result) {
      res.status(400).json({
        status: "failed",
        message: "already existed",
      });
    }
    const planet = await collection.insertOne(newPlanet);

    res.status(200).json({
      requestedAt: req.requestTime,
      status: `success Planet created with the following id: ${planet.insertedId}`,
      data: { planet },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePlanet = async (req, res) => {
  try {
    const updates = req.body;

    const collection = db.collection("planets");

    const updatedPlanets = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updates }
    );

    res.status(200).json({
      requestedAt: req.requestTime,
      status: `success,  Planet(s) updated`,
      data: { updatedPlanets },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePlanet = async (req, res) => {
  try {
    await client.connect();

    const deletedPlanet = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json({
      requestedAt: req.requestTime,
      status: `success,  Planet deleted`,
      data: { deletedPlanet },
    });
  } catch (error) {
    console.log(error);
  }
};
