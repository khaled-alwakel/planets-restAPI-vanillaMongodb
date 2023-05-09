const express = require("express");
const app = express();
const morgan = require("morgan");
const planetsRouter = require("./routes/planetsRouter.js");

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/planets", planetsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}....`);
});
