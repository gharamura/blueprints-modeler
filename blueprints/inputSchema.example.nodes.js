const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "input_schema_example";
const description = "input schema example";

const nodes = [
  {
    nodeSpec: "exampleStartSchema",
    next: "SCRIPT",
    name: "Start inputSchema Example",
  },
  {
    nodeSpec: "exampleScript",
    next: "BAG-DATA"
  },
  {
    nodeSpec: "exampleBag",
    parameters: {
      input: {
        example: { "$ref": "result.example" },
        valueResult: { "$ref": "result.value" }
      }
    }
  },
  {
    nodeSpec: "exampleFinish"
  }
]

module.exports = {
  name: name,
  description: description,
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes: getNodes(nodes),
    lanes: getLanes(getNodes(nodes)),
    environment: {},
  },
};