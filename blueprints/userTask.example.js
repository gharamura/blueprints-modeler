const { getLanes } = require("../lanes/lanes");

const name = 'user_task_example'
const description = ''

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start User Task Process",
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
    next: "3",
    lane_id: "anyone",
    parameters: {
      action: "userAction",
      input: {}
    }
  },
  {
    id: "3",
    type: "ScriptTask",
    name: "Print user input",
    next: "4",
    lane_id: "anyone",
    parameters: {
      input: {
        userInput: {"$ref": "result.activities[0].data.userInput"}
      },
      script: {
        function: [
          "fn",
          ["input", "&", "args"],
          [
            "println",
            ["`", "User input: "],
            ["get", "input", ["`", "userInput"]],
          ],
        ],
      },
    },
  },
  {
    id: "4",
    type: "Finish",
    name: "Finish User Task Process",
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