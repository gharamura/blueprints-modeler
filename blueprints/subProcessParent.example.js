const { getLanes } = require('./common/lanes')

const name = 'sub_process_parent_example'
const description = ''

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start Parent Process",
    parameters: {
      input_schema: {},
    },
    next: "2",
    lane_id: "anyone"
  },
  {
    id: "2",
    type: "SystemTask",
    category: "SetToBag",
    name: "Set values on bag",
    next: "3",
    lane_id: "anyone",
    parameters: {
      input: {
        example: "any example",
        valueResult: "any result"
      }
    }
  },
  {
    id: "3",
    type: "SubProcess",
    name: "Sub Process base in User task node",
    next: "4",
    lane_id: "anyone",
    parameters: {
      actor_data: {
        id: "2",
        claims: []
      },
      workflow_name: "sub_process_son_example",
      valid_response: "finished",
      input: {
        parent_sample_data: "1234"
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