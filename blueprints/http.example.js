const { getLanes } = require('./common/lanes')

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start HTTP Example",
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
    name: "Bag some initial values",
    next: "3",
    lane_id: "anyone",
    parameters: {
      input: {
        value: "casa"
      }
    },
  },
  {
    id: "3",
    type: "SystemTask",
    category: "HTTP",
    name: "Call an example Endpoint",
    next: "4",
    lane_id: "anyone",
    parameters: {
      input: {
        test: { $mustache: "value bag {{ bag.value }}" }
      },
      request: {
        verb: "POST",
        url: "https://webhook.site/c2f0b516-1855-4426-a484-58173347ad46",
        headers: {
          "ContentType": "application/json"
        },
      },
    }
  },
  {
    id: "4",
    type: "Finish",
    name: "Finish HTTP Example",
    next: null,
    lane_id: "anyone"
  }
]

module.exports = {
  name: 'http_example',
  description: '',
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes,
    lanes: getLanes(nodes),
    environment: {},
  }
}