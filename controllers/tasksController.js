let uri =
  "mongodb+srv://Khaled-Alwakel:rTZfq8uZiiJmQw0e@cluster0.g1hid9r.mongodb.net/sample_training?retryWrites=true&w=majority";

const { MongoClient } = require("mongodb");
const client = new MongoClient(uri);

exports.checkID = (req, res, next, value) => {
  console.log(`product id is : ${value}`);
  const id = req.params.id * 1;
  if (id > tasks.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id ",
    });
  }
  next();
};

// middleware for check the request body
exports.checkBody = (req, res, next) => {
  if (!req.body.Name || !req.body.priority) {
    return res.status(400).json({
      status: "fail",
      message: "missing name or priority!",
    });
  }
  next(); // next is create product
};

exports.getAllProducts = async (req, res) => {
  //TODO IMPLEMENT  ADVANCED FILTERING & PAGINATION HERE
  try {
    await client.connect();
    const tasks = client.db("sample_training").collection("tasks").find({}); // ADVANCED QUERY TO COME.....

    if (tasks) {
      res.status(200).json({
        requestedAt: req.requestTime,
        status: "success",
        results: products.length,
        data: { tasks },
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

exports.getProduct = (req, res) => {
  //TODO
};

exports.createProduct = (req, res) => {
  //TODO
};

exports.updateProduct = (req, res) => {
  //TODO
};

exports.deleteProduct = (req, res) => {
  //TODO
};
