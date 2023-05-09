let uri =
  "mongodb+srv://Khaled-Alwakel:rTZfq8uZiiJmQw0e@cluster0.g1hid9r.mongodb.net/sample_guides?retryWrites=true&w=majority";

const { MongoClient } = require("mongodb");
const client = new MongoClient(uri);

exports.checkID = async (req, res, next, value) => {
  console.log(`planet id is : ${value}`);
  const cursor = client
    .db("sample_guides")
    .collection("planets")
    .find({ _id: value });
  const result = await cursor.toArray();
  if (result)
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id ",
    });
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

exports.getPlanet = async (req, res) => {
  try {
    let query = { _id: ObjectId(req.params.id) };
    await client.connect();
    const planet = client
      .db("sample_guides")
      .collection("planets")
      .findOne(query);

    if (planet) {
      res.status(200).json({
        requestedAt: req.requestTime,
        status: "success",
        data: { planet },
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

exports.createPlanet = async (req, res) => {
  try {
    const newPlanet = req.body;
    await client.connect();
    const planet = client
      .db("sample_guides")
      .collection("planets")
      .insertOne(newPlanet);

    res.status(200).json({
      requestedAt: req.requestTime,
      status: `success Planet created with the following id: ${result.insertedId}`,
      data: { planet },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  } finally {
    await client.close();
  }
};

exports.updatePlanet = async (req, res) => {
  try {
    const query = { _id: ObjectId(req.params.id) };
    const updates = req.body;
    await client.connect();
    const planet = client
      .db("sample_guides")
      .collection("planets")
      .updateOne({ query }, { $set: updates });

    res.status(200).json({
      requestedAt: req.requestTime,
      status: `success,  Planet updated`,
      data: { planet },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  } finally {
    await client.close();
  }
};

exports.deletePlanet = async (req, res) => {
  try {
    const query = { _id: ObjectId(req.params.id) };

    await client.connect();
    const planet = client
      .db("sample_guides")
      .collection("planets")
      .deleteOne({ query });

    res.status(200).json({
      requestedAt: req.requestTime,
      status: `success,  Planet deleted`,
      data: { planet },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  } finally {
    await client.close();
  }
};
