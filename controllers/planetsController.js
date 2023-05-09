const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://Khaled-Alwakel:rTZfq8uZiiJmQw0e@cluster0.g1hid9r.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const dbName = "sample_guides";

exports.checkID = async (req, res, next, value) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("planets");
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
exports.checkBody = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).json({
      status: "failed",
      message: "missing name or orderFromSun",
    });
  else {
    next();
  }
};
// get all planet according to order from sun :)
exports.getAllPlanets = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("planets");
    const planets = await collection.find().toArray();

    res.status(200).json({
      requestedAt: req.requestTime,
      status: "success",
      results: planets.length,
      data: { planets },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "error : can't find planets",
    });
    console.log(error);
  }
};

exports.getPlanet = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("planets");
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
    const db = client.db(dbName);
    const collection = db.collection("planets");
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
    res.status(400).json({
      status: "failed",
      message: "error",
    });
    console.log(error);
  }
};

exports.updatePlanet = async (req, res) => {
  try {
    const updates = req.body;
    await client.connect();
    const db = client.db(dbName);
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
    const db = client.db(dbName);
    const collection = db.collection("planets");
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
