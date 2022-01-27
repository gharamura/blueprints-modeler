module.exports = {
  id: "TIMER",
  name: "wait 10 seconds",
  next: "END",
  type: "SystemTask",
  category: "timer",
  lane_id: "anyone",
  parameters: {
    input: {},
    timeout: 10,
  }
}