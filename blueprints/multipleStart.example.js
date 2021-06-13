const { getLanes } = require('./common/lanes')

const name = 'multiple_start_example'
const description = ''

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start node",
    parameters: {
      input_schema: {},
    },
    next: "99",
    lane_id: "simpleton"
  },
  {
    id: "2",
    type: "Start",
    name: "Start node for admin",
    parameters: {
      input_schema: {},
    },
    next: "99",
    lane_id: "admin",
  },
  {
    id: "99",
    type: "Finish",
    name: "Finish node",
    next: null,
    lane_id: "simpleton"
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