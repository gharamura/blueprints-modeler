const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "http_example";
const description = "http node use example";

//this examples the start node spec it refers to is a bundled spec, it will add a start node and a setToBag node.
//the second node (here, third one in the final blueprint) we have overrided the id, but not the next, so the next provided in the the node spec will be used.
//the last node - finish node - we will only define the spec, meaning that all default keys will be used.

const nodes = [
  {
    nodeSpec: "exampleStartBundle",
    id: "START",
    next: "3"
  },
  {
    nodeSpec: "exampleHttp",
    id: "3",
  },
  {
    nodeSpec: "exampleFinish",
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