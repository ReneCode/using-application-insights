// index.js

const express = require("express");
const morgan = require("morgan");
const appInsights = require("applicationinsights");

require("dotenv").config();

const app = express();

app.use(morgan("tiny", {}));

const key = process.env.INSTRUMENTATION_KEY;
if (!key) {
  throw Error("applicationInsight key missing");
}
appInsights.setup(key).start();

app.use((req, res, next) => {
  appInsights.defaultClient.trackNodeHttpRequest({
    request: req,
    response: res
  });
  next();
});

app.get("/:name?", (req, res) => {
  const name = req.params.name;
  appInsights.defaultClient.commonProperties = {
    name: name
  };
  appInsights.defaultClient.trackTrace({ message: "homepage" });
  appInsights.defaultClient.commonProperties = {};
  if (!name) {
    res.status(200).send("hi. What's your name? ");
  } else {
    res.status(200).send(`hi ${name}`);
  }
});

app.get("/hello/:name?", (req, res) => {
  const name = req.params.name || "";
  appInsights.defaultClient.commonProperties = {
    nameLength: name.length
  };
  appInsights.defaultClient.trackTrace({ message: "say hello" });
  appInsights.defaultClient.commonProperties = {};

  res.status(200).send(`Hello ${req.params.name}`);
});

const port = process.env.PORT || 8080;
const startDate = Date.now();
app.listen(port, () => {
  let duration = Date.now() - startDate;
  appInsights.defaultClient.trackMetric({
    name: "server startup time",
    value: duration
  });
  console.log("server started on port:", port);
});
