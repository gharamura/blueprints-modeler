const { getLanes } = require('./common/lanes')

const name = 'user_task_notify_example'
const description = ''

const nodes = [
  {
    id: "1",
    type: "Start",
    name: "Start User Task Notify Process",
    parameters: {
      input_schema: {},
    },
    next: "2",
    lane_id: "anyone"
  },
  {
    id: "2",
    type: "UserTask",
    name: "First user task",
    next: "3",
    lane_id: "anyone",
    parameters: {
      activity_manager: "notify",
      action: "userAction",
      input: {
        notifyData: "Notify user"
      },
      activity_schema: {
        type: "object",
        properties: {
          textParam: {
            type: "string"
          }
        },
        required: [ 'textParam']
      }
    }
  },
  {
    id: "3",
    type: "UserTask",
    name: "Second user task",
    next: "99",
    lane_id: "anyone",
    parameters: {
      activity_manager: "notify",
      action: "userAction",
      input: {
        notifyData: "Notify user 2"
      }
    }
  },
  {
    id: "99",
    type: "Finish",
    name: "Finish User Task Notify Process",
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