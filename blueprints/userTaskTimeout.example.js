const { getLanes } = require("../lanes/lanes");

const name = 'user_task_timeout_example'
const description = ''

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start User Task Timeout Process",
    parameters: {
      input_schema: {},
    },
    next: "2",
    lane_id: "anyone"
  },
  {
    id: "2",
    type: "UserTask",
    name: "User task available for 10 seconds",
    next: "99",
    lane_id: "anyone",
    parameters: {
      action: "userAction",
      input: {},
      timeout: 10,
    }
  },
  {
    id: "99",
    type: "Finish",
    name: "Finish User Task Timeout Process",
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