module.exports = {
  id: "FIND-PROCESS",
  name: "find process by some id",
  type: "systemTask",
  category: "findProcess",
  next: "END",
  lane_id: "actorId",
  parameters: {
    input: {
      entity_id: { $ref: "bag.entity_id" },
    },
  },
};
