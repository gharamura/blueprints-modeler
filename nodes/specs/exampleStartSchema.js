const inputSchema = require('../schemas/exampleStart')

module.exports = {
  id: "START",
  name: "start generic process",
  next: "CONFIG",
  type: "Start",
  lane_id: "anyone",
  parameters: {
    timeout: 3600, //1 hora
    input_schema: inputSchema,
  }
};
