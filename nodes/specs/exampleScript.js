module.exports = {
  id: "SCRIPT",
  type: "ScriptTask",
  name: "Create values for bag",
  next: "END",
  lane_id: "anyone",
  parameters: {
    input: {},
    script: {
      package: "",
      function: [
        "fn",
        ["&", "args"],
        {
          example: "bag_example",
          value: "bag_value",
        },
      ],
    },
  }
}