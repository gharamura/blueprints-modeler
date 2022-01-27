module.exports = {
  id: "GEN-USER-TASK",
  name: "user task genérica",
  next: "END",
  type: "UserTask",
  lane_id: "actorId",
  parameters: {
    input: {},
    action: "ANY_ACTION",
    timeout: 60,
    activity_manager: "commit"
  }
}