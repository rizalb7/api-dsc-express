const express = require("express");
const app = express();
const port = 5000;
const helmet = require("helmet");
const categoryRouter = require("./routes/category");
const placesRouter = require("./routes/places");
require("dotenv").config();

app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/category", categoryRouter);
app.use("/places", placesRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
