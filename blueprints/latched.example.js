const { getLanes } = require('./common/lanes')

const name = 'latched_lane_example'
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
    name: "Script Task node",
    next: "3",
    lane_id: "anyone",
    parameters: {
      input: {
        is_authorized: { $ref: "bag.is_authorized" }
      },
      script: {
        function: [
          "fn",
          ["input", "&", "args"],
          [
            "do",
            [
              "println",
              ["`", "AUTHORIZED TO USE LANE 2? "],
              ["or", ["get", "input", ["`", "is_authorized"]], ["`", "none"]]
            ]
          ]
        ]
      }
    },
  },
  {
    id: "3",
    type: "SystemTask",
    category: "setToBag",
    name: "set to bag node",
    next: "4",
    lane_id: "anyone",
    parameters: {
      input: {
        is_authorized: {$ref: "actor_data"}
      },
    }
  },
  {
    id: "4",
    type: "ScriptTask",
    name: "Script Task node",
    next: "5",
    lane_id: "anyone",
    parameters: {
      input: {
        is_authorized: { $ref: "bag.is_authorized" }
      },
      script: {
        function: ["fn", ["input", "&", "args"],
          ["do",
            ["println", ["`", "AUTHORIZED TO USE LANE 2? "],
              ["or", ["get", "input", ["`", "is_authorized"]], ["`", "none"]]],
          ]]
      }
    },
  },
  {
    id: "5",
    type: "UserTask",
    name: "Identity User Native Task node",
    next: "6",
    lane_id: "actorId",
    parameters: {
      action: "do something",
      input: {}
    }
  },
  {
    id: "6",
    type: "Finish",
    name: "Finish node",
    next: null,
    lane_id: "actorId"
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