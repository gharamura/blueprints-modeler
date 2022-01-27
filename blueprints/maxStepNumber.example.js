const { getLanes } = require("../lanes/lanes");

const parameters = {
  max_step_number: 20
}

// This blueprint has an loop in nodes 2-3, it will run until reaches the max_step_number defined in parameters.

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start Max Step Number Example",
    parameters: {
      input_schema: {}
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
          {
            example: "bag_example",
            value: "bag_value",
          },
        ],
      },
    }
  },
  {
    id: "3",
    type: "SystemTask",
    category: "SetToBag",
    name: "Set values on bag",
    next: "2",
    lane_id: "anyone",
    parameters: {
      input: {
        example: {"$ref": "result.example"},
        valueResult: {"$ref": "result.value"}
      }
    }
  },
  {
    id: "4",
    type: "Finish",
    name: "Finish Max Step Number Example",
    next: null,
    lane_id: "anyone"
  }
]

module.exports = {
  name: 'max_step_number_example',
  description: '',
  blueprint_spec: {
    requirements: ["core"],
    parameters,
    prepare: [],
    nodes,
    lanes: getLanes(nodes),
    environment: {},
  }
}