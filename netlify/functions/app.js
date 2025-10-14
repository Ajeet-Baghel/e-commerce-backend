const serverless = require("serverless-http");
const app = require("../src/app");

const handler = serverless(app);
module.exports = { handler };
