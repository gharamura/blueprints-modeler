const { getLanes } = require('./common/lanes')

const name = 'bag_example'
const description = 'Exemplo demonstrando o uso do nó tipo setToBag'

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
        function: ["fn",["&", "args"],
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
    next: "4",
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