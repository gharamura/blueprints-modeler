const { getLanes } = require("../lanes/lanes");

const name = 'channel_restriction_example'
const description = ''

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start node",
    parameters: {
      input_schema: {},
    },
    next: "2",
    lane_id: "anyone"
  },
  {
    id: "2",
    type: "UserTask",
    name: "User task node",
    next: "99",
    lane_id: "anyone",
    parameters: {
      action: "userAction",
      channels: ["1", "2"],
      input: {}
    }
  },
  {
    id: "99",
    type: "Finish",
    name: "Finish node",
    next: null,
    lane_id: "anyone"
  }
]

module.exports = {
  name: name,
  description: description,
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes,
    lanes: getLanes(nodes),
    environment: {},
  }
}