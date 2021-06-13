const { getLanes } = require('./common/lanes')

const name = 'timer_example'
const description = ''

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start Timer Process",
    parameters: {
      input_schema: {},
    },
    next: "2",
    lane_id: "anyone"
  },
  {
    id: "2",
    type: "SystemTask",
    category: "timer",
    name: "Wai 10 seconds",
    next: "3",
    lane_id: "anyone",
    parameters: {
      input: {},
      timeout: 10,
    }
  },
  {
    id: "3",
    type: "Finish",
    name: "Finish Timer Process",
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