const { getLanes } = require('./common/lanes')

const name = 'flow_node_example'
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
    type: "ScriptTask",
    name: "Create values for bag",
    next: "3",
    lane_id: "anyone",
    parameters: {
      input: {},
      script: {
        package: "",
        function: [
          "fn",
          ["&", "args"],
          [
            "set",
            {
              name: "valueExample",
              extraData: 98,
            },
            ["`", "value"],
            [
              "js",
              [
                ".",
                "Math",
                ["`", "floor"],
                [
                  "*",
                  [".", "Math", ["`", "random"]],
                  [".", "Math", ["`", "floor"], 3],
                ],
              ],
            ],
          ],
        ],
      },
    }
  },
  {
    id: "3",
    type: "Flow",
    name: "Set values on bag",
    next: {
      1: "2",
      default: "4",
    },
    lane_id: "anyone",
    parameters: {
      input: {
        decision: {
          $ref: "result.value"
        }
      }
    }
  },
  {
    id: "4",
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