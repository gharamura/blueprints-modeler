module.exports = {
  name: 'timeout_example',
  description: 'Example of blueprint with timeout defined at start',
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes: [
      {
        id: "1",
        type: "Start",
        name: "Start node",
        parameters: {
          input_schema: {},
          timeout: 10,
        },
        next: "2",
        lane_id: "1"
      },
      {
        id: "2",
        type: "userTask",
        name: "User Task node",
        next: "3",
        lane_id: "1",
        parameters: {
          action: 'some_action',
          input: {},
        }
      },
      {
        id: "3",
        type: "Finish",
        name: "Finish node",
        next: null,
        lane_id: "1"
      }
    ],
    lanes: [
      {
        id: "1",
        name: "default",
        rule:  ["fn",["&","args"],true]
      }
    ],
    environment: {},
  }
}