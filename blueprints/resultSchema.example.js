const { getLanes } = require('./common/lanes')

const name = 'result_schema_example'
const description = 'Result schema prevents the process from continue if the result is different. It can be applied on any node type.'

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start Result Schema Example",
    next: "2",
    parameters: {
      input_schema: {}
    },
    lane_id: "anyone"
  },
  {
    id: "2",
    type: "SystemTask",
    name: "Take the order",
    category: "HTTP",
    next: "3",
    lane_id: "anyone",
    parameters: {
      input: {
        status: "pending",
        qty: 1,
        flavors: ["peperoni"],
        comments: "any comment here"
      },
      request: {
        url: "https://5faabe16b5c645001602b152.mockapi.io/order",
        verb: "POST",
        headers: {
          ContentType: "application/json"
        }
      }
    },
    result_schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        qty: { type: "number" },
        status: { type: "string" },
        flavors: { type: "array" },
        comments: { type: "string" },
        createdAt: { type: "string", format: "date-time" }
      },
    }
  },
  {
    id: "3",
    type: "SystemTask",
    category: "SetToBag",
    name: "Save Order",
    next: "4",
    lane_id: "anyone",
    parameters: {
      input: {
        order: {
          "$ref": "result.data"
        }
      }
    }
  },
  {
    id: "4",
    type: "Finish",
    name: "Finish",
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