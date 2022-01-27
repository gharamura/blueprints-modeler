const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "timer_example";
const description = "timer node use example";

//this examples demonstrates a blueprint built from nodeSpecs.
//the node spec function as a template. Any parameter can be overrided, id, next, lane_id, etc.

const nodes = [
  {
    nodeSpec: "exampleStart",
    id: "1",
    next: "2",
  },
  {
    nodeSpec: "exampleTimer",
    id: "2",
    next: "3"
  },
  {
    nodeSpec: "exampleFinish",
    id: "3",
    lane_id: "anyone"
  },
];

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
