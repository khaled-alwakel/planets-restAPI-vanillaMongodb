const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasksRouter.js");

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tasks", tasksRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}....`);
});
